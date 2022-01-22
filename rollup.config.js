const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const settings = require('./package.json').settings

module.exports = [
  {
    input: 'src/assets/javascripts/application.js',
    output: {
      file: 'public/assets/javascripts/application.js',
      format: 'iife'
    },
    plugins: [nodeResolve(), commonjs()]
  }
]
