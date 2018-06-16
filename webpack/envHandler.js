const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { baseHref, name, jsPath, buildFolder } = require('./jsonReader')

const htmlHandler = (env) => {
  return new HTMLPlugin({
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
}
const outputHandler = (env) => {
  return {
    path: path.resolve(buildFolder),
    chunkFilename: jsPath[env],
    filename: jsPath[env],
  }
}
module.exports = {
  htmlHandler,
  outputHandler,
}
