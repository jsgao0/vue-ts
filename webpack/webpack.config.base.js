const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { alias, ecma } = require('./jsonReader')

module.exports = {
  entry: {
    vendors: ['normalize.css', 'animate.css'],
    index: ['./src/app/index.ts'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias,
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve('loaders')],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: path.resolve('webpack/loaders/removeCssComment.js'),
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve('src/app/scss')],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: path.resolve('webpack/loaders/removeCssComment.js'),
          },
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './webpack/postcss.config.js',
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        uglifyOptions: {
          ecma,
          output: {
            comments: false,
            beautify: false,
          },
          compress: {
            drop_console: true,
          },
          warnings: false,
        },
      }),
    ],
    runtimeChunk: true,
  },
  stats: {
    warnings: false,
    entrypoints: false,
    children: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets/',
        to: 'assets',
      },
    ]),
    new VueLoaderPlugin(),
    new ManifestPlugin(),
  ],
}
