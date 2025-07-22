const stripMarkdown = md =>
    md
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')   // imágenes
      .replace(/\[[^\]]+\]\([^)]*\)/g, '')    // links
      .replace(/[`*_>#+\-]/g, ' ')            // símbolos md
      .replace(/\s+/g, ' ')
      .trim()

module.exports = stripMarkdown