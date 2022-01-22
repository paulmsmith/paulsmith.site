const merge = require('deepmerge')

module.exports = (ObjA, ObjB) => {
  return merge(ObjA, ObjB)
}
