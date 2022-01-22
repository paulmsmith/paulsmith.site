const Nunjucks = require('nunjucks')
const isDevelopmentEnvironment = process.env.NODE_ENV === 'development'

// instantiate the nunjucks environment
const nunjucksEnvironment = new Nunjucks.Environment(
  new Nunjucks.FileSystemLoader(['src/templates'], {
    noCache: true
  })
)

nunjucksEnvironment.addGlobal('env', isDevelopmentEnvironment)

module.exports = nunjucksEnvironment
