const htmlmin = require('html-minifier-terser');

module.exports = async function htmlMinTransform(value, outputPath) {
  if (typeof outputPath === 'string' && outputPath.endsWith('.html')) {
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
