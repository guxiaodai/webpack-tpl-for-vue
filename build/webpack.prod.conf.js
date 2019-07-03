const path = require('path')
const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

const utils = require('./utils')
const { resolve } = utils

console.log(JSON.stringify(baseConfig, null, 2))
const config = merge(baseConfig, {
  mode: 'production',
  // optimization: { minimizer: [new UglifyJsPlugin()] },
  plugins: [
    // new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})

module.exports = config
