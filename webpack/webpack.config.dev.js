const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const envHandler = require('./envHandler')
const base = require('./webpack.config.base')
const { buildFolder } = require('./jsonReader')
const env = 'development'
const dev = {
  ...base,
  mode: env,
  devtool: 'source-map',
  output: envHandler.outputHandler(env),
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
    envHandler.htmlHandler(env),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/api/',
        to: 'api',
      },
    ]),
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
    after(app) {
      app.get('/sw.js', (req, res) => {
        res.set({ 'Content-Type': 'application/javascript; charset=utf-8' })
        res.send(fs.readFileSync('build/sw.js'))
      })
    },
  },
}
module.exports = dev
