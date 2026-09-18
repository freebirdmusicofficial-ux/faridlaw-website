module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", function (dateObj) {
    if (!dateObj) return "";
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  });

  // Copy static, hand-written files through untouched
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("assets");

  // Only .njk and .md are processed as templates — index.html/admin
  // pass through verbatim above, so they're never touched by the
  // template engine (avoids curly-brace conflicts with embedded CSS/JS).
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  // Blog posts collection, newest first
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/publications/*.md").sort((a, b) => {
      return (b.data.date || 0) - (a.data.date || 0);
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
  };
};
