const markdown = require('markdown-it')
const anchor = require('markdown-it-anchor')
const addClass = require('@toycode/markdown-it-class')

module.exports = (() => {
  const opts = {
    html: true,
    breaks: true,
    linkify: false,
    typographer: true
  }

  const parser = markdown(opts)

  parser
    .use(require('markdown-it-abbr'))
    .use(anchor, {
      permalink: anchor.permalink.headerLink()
    })
    .use(addClass,{
      'hr': ['section-break', 'section-break--decorative']
    })
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-table-of-contents'), {
      containerHeaderHtml: '<h2 id="contents" class="heading heading--toc">Contents</h2>',
      includeLevel: [2, 3],
      containerClass: 'markdown-table-of-contents'
    })

  return parser
})()
