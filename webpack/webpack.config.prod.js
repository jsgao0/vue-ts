const { LicenseWebpackPlugin } = require('license-webpack-plugin')
const envHandler = require('./envHandler')
const base = require('./webpack.config.base')
const env = 'production'
const prod = {
  ...base,
  mode: env,
  output: envHandler.outputHandler(env),
  optimization: {
    ...base.optimization,
    nodeEnv: env,
  },
  plugins: [
    ...base.plugins,
    new LicenseWebpackPlugin({
      pattern: /.*/,
      outputFilename: 'assets/licenses.txt',
      additionalPackages: base.entry.vendors,
    }),
    envHandler.htmlHandler(env),
  ],
}

module.exports = prod
