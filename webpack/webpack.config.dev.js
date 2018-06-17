const path = require('path')
const webpack = require('webpack')
const envHandler = require('./envHandler')
const base = require('./webpack.config.base')
const { buildFolder } = require('./jsonReader')
const env = 'development'
const dev = {
  ...base,
  mode: env,
  devtool: 'source-map',
  output: envHandler.output(env),
  optimization: {
    ...base.optimization,
    nodeEnv: env,
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/,
  },
  plugins: [
    ...base.plugins,
    envHandler.html(env),
    envHandler.api(env),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(buildFolder),
    noInfo: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    port: 3000,
    open: true,
    hot: true,
    inline: true,
  },
}
module.exports = dev
