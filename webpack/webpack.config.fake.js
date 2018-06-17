const webpack = require('webpack')
const envHandler = require('./envHandler')
const base = require('./webpack.config.base')
const dev = require('./webpack.config.dev')
const env = 'fake'
const fake = {
  ...dev,
  plugins: [
    ...base.plugins,
    envHandler.html(dev.mode),
    envHandler.globalEnv(env),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
module.exports = fake
