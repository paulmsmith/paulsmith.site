require('dotenv').config()
const Nunjucks = require('nunjucks');
const WithExtension = require('@allmarkedup/nunjucks-with');
const node_env = process.env.NODE_ENV
const cloudinaryKey = process.env.cloudinaryKey

let nunjucksEnvironment = new Nunjucks.Environment(
  new Nunjucks.FileSystemLoader("src/templates")
);

nunjucksEnvironment.addExtension('WithExtension', new WithExtension());

module.exports = function (eleventyConfig) {

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);

  // add transforms
  if (node_env == 'production') {
    eleventyConfig.addTransform('htmlmin', require('./lib/transforms/html-min-transform'));
  }

  eleventyConfig.addGlobalData('node_env', node_env)
  eleventyConfig.addGlobalData('isDev',node_env == 'development' ? true : false)
  eleventyConfig.addGlobalData('cloudinaryKey',cloudinaryKey)

  eleventyConfig.setLibrary('md', require('./lib/libraries/markdown'))

  // shortcodes
  eleventyConfig.addShortcode('imgr',require('./lib/shortcodes/cloudinaryimage'))
  eleventyConfig.addShortcode('video',require('./lib/shortcodes/video'))

  // Plugins
  eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"));
  eleventyConfig.addPlugin(require("eleventy-plugin-embed-twitter"), {
    cacheText: true,
    width: 400,
    embedClass: 'c-embed c-embed--tweet'
  })

  // Filters
  eleventyConfig.addFilter('date', require('./lib/filters/date'))
  eleventyConfig.addFilter('deepmerge', require('./lib/filters/deepmerge'))
  eleventyConfig.addFilter('includes', require('./lib/filters/includes'))
  eleventyConfig.addFilter('markdown', require('./lib/filters/markdown'))
  eleventyConfig.addFilter('slug', require('./lib/filters/slug'))
  eleventyConfig.addFilter('sort', require('./lib/filters/sort'))
  eleventyConfig.addFilter('widont', require('./lib/filters/widont'))
  eleventyConfig.addFilter('console', require('./lib/filters/console'))
  eleventyConfig.addFilter('dump', require('./lib/filters/dump'))
  eleventyConfig.addFilter('find', require('./lib/filters/find'))
  eleventyConfig.addFilter('padstart', require('./lib/filters/padstart'))
  eleventyConfig.addFilter('weekdate', require('./lib/filters/weekdates'))

  // Filter source file names using a glob
  eleventyConfig.addCollection('weeknotes', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/content/weeknotes/*.md')
      .reverse()
  })

  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/content/posts/*.md')
      .reverse()
  })

  //   // Creates a 'collection' of guidance content but only those that are not set to be hidden
  // eleventyConfig.addCollection('posts', collection => {
  //   return [
  //     ...collection
  //       .getFilteredByGlob('./app/posts/*.md')
  //       .filter(function (item) {})
  //   ].reverse()
  // })

  eleventyConfig.addPassthroughCopy({
    './src/assets/images': './assets/images',
    './src/assets/fonts': './assets/fonts'
  })

  // get netlifycms from npm and put it in the right place
  eleventyConfig.addPassthroughCopy({
    './node_modules/netlify-cms/dist/netlify-cms.js':
      './assets/javascripts/netlify-cms.js'
  })

  eleventyConfig.addWatchTarget('./src/assets/')
  eleventyConfig.addWatchTarget('./src/assets/stylesheets/')
  eleventyConfig.addWatchTarget('./src/templates/components/')

  // Config
  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: 'templates',
      layouts: 'templates/layouts',
      data: 'data'
    },
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    jsDataFileSuffix: '.config',
    templateFormats: ['njk', 'md'],
    passthroughFileCopy: true
  }
}
