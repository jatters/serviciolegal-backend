# version: 5-44.0
# image: jatters/serviciolegal-strapi:5-44.0
#
# Build: docker build -t jatters/serviciolegal-strapi:5-44.0 .
# Run:   docker run -d --env-file .env -p 1337:1337 \
#          -v $(pwd)/uploads:/opt/app/public/uploads \
#          jatters/serviciolegal-strapi:5-44.0

# ============================================
# Stage 1: dependencies (full install incl. devDeps)
# ============================================
FROM node:22-alpine AS dependencies

WORKDIR /opt/app

# Build toolchain for native modules (sharp/libvips compiles bindings here)
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    vips-dev

COPY package.json yarn.lock ./

# Hydrate full dependency tree — `strapi build` needs admin-panel devDeps too
RUN yarn config set network-timeout 600000 -g && \
    yarn install --frozen-lockfile

# ============================================
# Stage 2: builder (compiles admin panel, prunes devDeps)
# ============================================
FROM node:22-alpine AS builder

WORKDIR /opt/app

RUN apk add --no-cache vips-dev build-base

# Reuse hydrated node_modules from previous stage
COPY --from=dependencies /opt/app/node_modules ./node_modules

# Project source — `.dockerignore` keeps node_modules/.cache/.tmp out of context
COPY . .

ENV NODE_ENV=production

# Build admin panel (outputs to ./build)
RUN yarn build

# Prune to production-only deps for the runtime image
RUN yarn install --production --frozen-lockfile --prefer-offline

# ============================================
# Stage 3: runner (final, slim, non-root)
# ============================================
FROM node:22-alpine AS runner

WORKDIR /opt/app

# Runtime libs: vips for sharp, tzdata briefly to bake the timezone then remove
RUN apk add --no-cache tzdata vips

ENV TZ=America/Bogota
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo "$TZ" > /etc/timezone && \
    apk del tzdata

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337
# Disable Strapi telemetry by default; flip in env if you want it
ENV STRAPI_TELEMETRY_DISABLED=true

# Non-root user (matches node:alpine convention but with a fixed UID/GID
# so volume permissions stay predictable across hosts)
RUN addgroup -g 1001 strapi && \
    adduser -D -u 1001 -G strapi strapi

# Production deps and built admin panel
COPY --from=builder --chown=strapi:strapi /opt/app/node_modules ./node_modules
COPY --from=builder --chown=strapi:strapi /opt/app/build ./build

# Source — Strapi loads JS at runtime (not transpiled into ./dist for JS projects)
COPY --from=builder --chown=strapi:strapi /opt/app/config ./config
COPY --from=builder --chown=strapi:strapi /opt/app/src ./src
COPY --from=builder --chown=strapi:strapi /opt/app/database ./database
COPY --from=builder --chown=strapi:strapi /opt/app/utils ./utils
COPY --from=builder --chown=strapi:strapi /opt/app/types ./types
COPY --from=builder --chown=strapi:strapi /opt/app/public ./public
COPY --from=builder --chown=strapi:strapi /opt/app/favicon.png ./favicon.png
COPY --from=builder --chown=strapi:strapi /opt/app/package.json ./
COPY --from=builder --chown=strapi:strapi /opt/app/yarn.lock ./

# Writable dirs — `public/uploads` is the volume mount target in production
RUN mkdir -p public/uploads .cache .strapi && \
    chown -R strapi:strapi public .cache .strapi

USER strapi

EXPOSE 1337

# Strapi 5 exposes /_health (returns 204 when healthy)
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit([200, 204].includes(r.statusCode) ? 0 : 1)})"

CMD ["yarn", "start"]
