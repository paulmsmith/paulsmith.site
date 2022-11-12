const settings = require('./../../package.json').settings

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
  }${config.imgClasses ? ` class="${config.imgClasses}"` : ``}`
  if (process.env.NODE_ENV !== 'development' || config.useCloud) {
    // prettier-ignore
    return `<figure ${config.classes ? ` class="${config.classes}"` : ''}><img sizes="(min-width: 720px) 980px, 100vw"
      srcset="${settings.cloudinary.url}/f_auto,q_${config.quality},w_256${config.transforms ? `,${config.transforms}` : ''}/${settings.url}${settings.paths.images}${config.imagePath} 256w,
              ${settings.cloudinary.url}/f_auto,q_${config.quality},w_512${config.transforms ? `,${config.transforms}` : ''}/${settings.url}${settings.paths.images}${config.imagePath} 512w,
              ${settings.cloudinary.url}/f_auto,q_${config.quality},w_768${config.transforms ? `,${config.transforms}` : ''}/${settings.url}${settings.paths.images}${config.imagePath} 768w,
              ${settings.cloudinary.url}/f_auto,q_${config.quality},w_1024${config.transforms ? `,${config.transforms}` : ''}/${settings.url}${settings.paths.images}${config.imagePath} 1024w,
              ${settings.cloudinary.url}/f_auto,q_${config.quality},w_1280${config.transforms ? `,${config.transforms}` : ''}/${settings.url}${settings.paths.images}${config.imagePath} 1280w"
      src="${settings.cloudinary.url}/f_auto,q_${config.quality},w_iw${config.transforms ? `,${config.transforms}` : ''}/${settings.url}${settings.paths.images}${config.imagePath}"
      ${imgAttributes}></figure>`;
  }
  return `<figure${config.classes ? ` class="${config.classes}"` : ''}><img src="${settings.paths.images}${config.imagePath}"${imgAttributes}></figure>`
}
