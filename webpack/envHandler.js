const path = require('path')
const { EnvironmentPlugin } = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const {
  baseHref,
  name,
  jsFileName,
  buildFolder,
  apiPath,
} = require('./jsonReader')

const html = (env) =>
  new HTMLPlugin({
    title: name,
    baseHref: baseHref[env],
    template: './src/template/index.html',
    chunks: ['vendors', 'index', 'runtime~index'],
    filename: `index.html`,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
    },
  })
const output = (env) => ({
  path: path.resolve(buildFolder),
  chunkFilename: jsFileName[env],
  filename: jsFileName[env],
})
const api = (env) => {
  const config = {}
  apiPath.forEach((e) => {
    config[e.name] = e.path[env]
  })
  return new EnvironmentPlugin(config)
}
module.exports = {
  html,
  output,
  api,
}
