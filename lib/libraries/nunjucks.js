const Nunjucks = require('nunjucks')
const isDevelopmentEnvironment = process.env.NODE_ENV === 'development'

module.exports = (() => {
  const parser = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader(['app/components', 'app/layouts'], {
      noCache: isDevelopmentEnvironment,
      watch: isDevelopmentEnvironment
    }),
    {
      lstripBlocks: true,
      trimBlocks: true
    }
  )

  // makes a template variable 'env' available, defaults to local if environment variable not found
  parser.addGlobal('env', isDevelopmentEnvironment)

  return parser
})()
