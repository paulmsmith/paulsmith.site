const htmlmin = require('html-minifier-terser');

module.exports = async function htmlMinTransform(value, outputPath) {
  if (outputPath.indexOf('.html') > -1) {
    const minified = await htmlmin.minify(value, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true
    });
    return minified;
  }
  return value;
};
