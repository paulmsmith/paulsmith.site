const settings = require('./../../package.json').settings

module.exports = params => {
  if (params) {
      return `<video width="${params.width}" height="${params.height}" ${params.attributes ? params.attributes : 'autoplay loop muted playsinline'}><source src="${settings.paths.images}/${params.url}" type="video/mp4" /></video>`
  } else {
    return
  }
}
