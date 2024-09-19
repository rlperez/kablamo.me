export const drafts = eleventyConfig => {
  eleventyConfig.addGlobalData('eleventyComputed.permalink', function () {
    return data => {
      // Always skip during non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return false; // Ensure templates that use this handle it correctly
      }
      return data.permalink;
    };
  });

  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
  eleventyConfig.addGlobalData('eleventyComputed.eleventyExcludeFromCollections', function () {
    return data => {
      // Always exclude from non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return true;
      }

      return data.eleventyExcludeFromCollections ?? false;
    };
  });
};
