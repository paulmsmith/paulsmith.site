const appConfig = require('./../../package.json').appconfig

// useful: https://cloudinary.com/blog/responsive_images_with_srcset_sizes_and_cloudinary

module.exports = userConfig => {
  // default config overridden or extended by userConfig
  const config = {
    quality: '70',
    ...userConfig
  }
  const imgAttributes = ` alt="${config.alt ? config.alt : ''}" ${
    config.lazyload ? ` lazyload="true"` : ``
  }${config.width ? ` width="${config.width}"` : ``}${
    config.height ? ` height="${config.height}"` : ``
  }${config.classes ? ` class="${config.classes}"` : ``}`
  if (config.currentEnv !== 'dev' || config.useCloud) {
    // prettier-ignore
    return `<img sizes="(min-width: 720px) 980px, 100vw"
      srcset="${appConfig.cloudinary.url}/f_auto,q_${config.quality},w_256${config.transforms ? `,${config.transforms}` : ''}/${appConfig.url}/${appConfig.paths.images}${config.imagePath} 256w,
              ${appConfig.cloudinary.url}/f_auto,q_${config.quality},w_512${config.transforms ? `,${config.transforms}` : ''}/${appConfig.url}/${appConfig.paths.images}${config.imagePath} 512w,
              ${appConfig.cloudinary.url}/f_auto,q_${config.quality},w_768${config.transforms ? `,${config.transforms}` : ''}/${appConfig.url}/${appConfig.paths.images}${config.imagePath} 768w,
              ${appConfig.cloudinary.url}/f_auto,q_${config.quality},w_1024${config.transforms ? `,${config.transforms}` : ''}/${appConfig.url}/${appConfig.paths.images}${config.imagePath} 1024w,
              ${appConfig.cloudinary.url}/f_auto,q_${config.quality},w_1280${config.transforms ? `,${config.transforms}` : ''}/${appConfig.url}/${appConfig.paths.images}${config.imagePath} 1280w"
      src="${appConfig.cloudinary.url}/f_auto,q_${config.quality},w_iw${config.transforms ? `,${config.transforms}` : ''}/${appConfig.url}/${appConfig.paths.images}${config.imagePath}"
      ${imgAttributes}>`;
  }
  return `<img src="/${appConfig.paths.images}${config.imagePath}"${imgAttributes}>`
}
