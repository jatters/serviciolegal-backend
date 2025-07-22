const stripMarkdown = require("../utils/stripMarkdown.js");

module.exports = ({ env }) => ({
  seo: { enabled: true },

  meilisearch: {
    config: {
      host: env("MEILI_HOST"),
      apiKey: env("MEILI_MASTER_KEY"),

      /* ---------- ARTÍCULOS ---------- */
      articulo: {
        indexName: "articulo",
        entriesQuery: {
          populate: ["image", "category"],
          locale: "*",
          limit: 5000,
        },
        settings: {
          searchableAttributes: ["title", "category", "content"],
          displayedAttributes: [
            "title",
            "slug",
            "image",
            "category",
            "type",
            "publishedAtTimestamp",
            "content",
          ],
          filterableAttributes: ["locale", "category"],
          proximityPrecision: "byAttribute",
          typoTolerance: { minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 } },
          rankingRules: [
            "typo",
            "words",
            "proximity",
            "attribute",
            "exactness",
            "sort",
          ],
          sortableAttributes: ["publishedAtTimestamp"],
          synonyms: {
            /* --- Visas, residencia y migración --- */
            visa: ["visado", "permiso", "permiso de residencia"],
            visado: ["visa", "permiso", "permiso de residencia"],
            permiso: ["visa", "visado", "permiso de residencia"],
            "permiso de residencia": ["visa", "visado"],
            residencia: ["residence", "residency", "residente"],
            resident: ["residencia", "residence", "residency"],
            migratorio: ["inmigración", "migración", "immigration"],
            inmigración: ["migración", "immigration", "migratorio"],
            immigration: ["inmigración", "migration", "migratory"],

            /* --- Nacionalidad / ciudadanía --- */
            ciudadanía: ["ciudadania", "nacionalidad", "citizenship"],
            ciudadania: ["ciudadanía", "nacionalidad", "citizenship"],
            nacionalidad: ["ciudadanía", "citizenship", "nationality"],
            citizenship: ["nacionalidad", "ciudadanía", "nationality"],

            /* --- Marcas e intelectual --- */
            marca: ["trademark", "brand", "registro de marca"],
            trademark: ["marca", "brand"],
            brand: ["marca", "trademark"],
            registro: ["registration", "register", "inscripción"],
            registration: ["registro", "register"],

            /* --- Empresas y derecho corporativo --- */
            empresa: ["company", "business", "corporation", "sociedad", "sas"],
            company: ["empresa", "business", "corporation"],
            business: ["empresa", "company", "corporation"],
            corporation: ["empresa", "company"],
            sas: ["empresa", "sociedad", "company"],
            corporativo: ["corporate"],
            corporate: ["corporativo"],

            /* --- Servicios jurídicos generales --- */
            abogado: ["abogada", "lawyer", "attorney", "solicitor"],
            abogada: ["abogado", "lawyer", "attorney"],
            lawyer: ["abogado", "attorney"],
            attorney: ["abogado", "lawyer"],
            procurador: ["abogado", "attorney"],

            /* --- Áreas de práctica --- */
            penal: ["criminal"],
            criminal: ["penal"],
            familia: ["familiar", "family"],
            family: ["familia"],
            laboral: ["labor", "work", "employment", "job"],
            labor: ["laboral", "employment"],
            trabajo: ["laboral", "employment", "work"],
            inmobiliario: ["real estate", "property", "realestate"],
            "real estate": ["inmobiliario", "property"],
            property: ["inmobiliario", "real estate"],

            /* --- Salud y seguros --- */
            salud: ["health"],
            health: ["salud"],
            póliza: ["poliza", "policy", "insurance"],
            poliza: ["póliza", "policy", "insurance"],
            insurance: ["póliza", "policy"],

            /* --- Otros términos útiles --- */
            pasaporte: ["passport"],
            passport: ["pasaporte"],
            divorcio: ["divorce"],
            divorce: ["divorcio"],
            impuesto: ["tax", "tributo"],
            tax: ["impuesto"],
            propiedad: ["ownership", "estate"],
            ownership: ["propiedad"],
          },
          stopWords: [
            "de",
            "la",
            "el",
            "los",
            "y",
            "the",
            "a",
            "of",
            "for",
            "to",
            "en",
            "es",
            "and",
          ],
          pagination: {
            maxTotalHits: 1000,
          },
        },
        transformEntry({ entry }) {
          return {
            id: entry.id,
            title: entry.title,
            slug: entry.slug,
            content: stripMarkdown(entry.content || "").slice(0, 4000),
            locale: entry.locale,
            category: entry.category?.name ?? null,
            image: entry.image ?? null,
            createdAt: entry.createdAt,
            type: "articulo",
            publishedAtTimestamp: new Date(
              entry.createdAt ?? entry.updatedAt,
            ).getTime(),
          };
        },
      },

      /* ---------- SERVICIOS ---------- */
      servicio: {
        indexName: "servicio",
        entriesQuery: {
          locale: "*",
          populate: {
            image: true,
            categoria: { fields: ["title", "slug"] },
          },
        },
        settings: {
          searchableAttributes: [
            "title",
            "description",
            "longText",
            "categoria",
          ],
          filterableAttributes: ["locale", "categoria"],
          typoTolerance: { minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 } },
          rankingRules: [
            "words",
            "typo",
            "proximity",
            "attribute",
            "sort",
            "exactness",
          ],
          synonyms: {
            /* --- Visas, residencia y migración --- */
            visa: ["visado", "permiso", "permiso de residencia"],
            visado: ["visa", "permiso", "permiso de residencia"],
            permiso: ["visa", "visado", "permiso de residencia"],
            "permiso de residencia": ["visa", "visado"],
            residencia: ["residence", "residency", "residente"],
            resident: ["residencia", "residence", "residency"],
            migratorio: ["inmigración", "migración", "immigration"],
            inmigración: ["migración", "immigration", "migratorio"],
            immigration: ["inmigración", "migration", "migratory"],

            /* --- Nacionalidad / ciudadanía --- */
            ciudadanía: ["ciudadania", "nacionalidad", "citizenship"],
            ciudadania: ["ciudadanía", "nacionalidad", "citizenship"],
            nacionalidad: ["ciudadanía", "citizenship", "nationality"],
            citizenship: ["nacionalidad", "ciudadanía", "nationality"],

            /* --- Marcas e intelectual --- */
            marca: ["trademark", "brand", "registro de marca"],
            trademark: ["marca", "brand"],
            brand: ["marca", "trademark"],
            registro: ["registration", "register", "inscripción"],
            registration: ["registro", "register"],

            /* --- Empresas y derecho corporativo --- */
            empresa: ["company", "business", "corporation", "sociedad", "sas"],
            company: ["empresa", "business", "corporation"],
            business: ["empresa", "company", "corporation"],
            corporation: ["empresa", "company"],
            sas: ["empresa", "sociedad", "company"],
            corporativo: ["corporate"],
            corporate: ["corporativo"],

            /* --- Servicios jurídicos generales --- */
            abogado: ["abogada", "lawyer", "attorney", "solicitor"],
            abogada: ["abogado", "lawyer", "attorney"],
            lawyer: ["abogado", "attorney"],
            attorney: ["abogado", "lawyer"],
            procurador: ["abogado", "attorney"],

            /* --- Áreas de práctica --- */
            penal: ["criminal"],
            criminal: ["penal"],
            familia: ["familiar", "family"],
            family: ["familia"],
            laboral: ["labor", "work", "employment", "job"],
            labor: ["laboral", "employment"],
            trabajo: ["laboral", "employment", "work"],
            inmobiliario: ["real estate", "property", "realestate"],
            "real estate": ["inmobiliario", "property"],
            property: ["inmobiliario", "real estate"],

            /* --- Salud y seguros --- */
            salud: ["health"],
            health: ["salud"],
            póliza: ["poliza", "policy", "insurance"],
            poliza: ["póliza", "policy", "insurance"],
            insurance: ["póliza", "policy"],

            /* --- Otros términos útiles --- */
            pasaporte: ["passport"],
            passport: ["pasaporte"],
            divorcio: ["divorce"],
            divorce: ["divorcio"],
            impuesto: ["tax", "tributo"],
            tax: ["impuesto"],
            propiedad: ["ownership", "estate"],
            ownership: ["propiedad"],
          },
          stopWords: [
            "de",
            "la",
            "el",
            "los",
            "y",
            "the",
            "a",
            "of",
            "for",
            "to",
          ],
        },
        transformEntry({ entry }) {
          const blocksToText = (blocks = []) =>
            blocks
              .map((b) =>
                typeof b === "string"
                  ? b
                  : b?.children?.map((c) => c.text).join(" "),
              )
              .join(" ");

          return {
            id: entry.id,
            title: entry.title,
            slug: entry.Slug,
            content: blocksToText(entry.content),
            longText: blocksToText(entry.longDescriptionService),
            locale: entry.locale,
            categoria: entry.categoria?.title ?? null,
            categoriaSlug: entry.categoria?.slug ?? null,
            image: entry.image ?? null,
            type: "servicio",
            publishedAtTimestamp: Date.now(),
          };
        },
      },
    },
  },
});
