const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const webpack = require('webpack')

const utils = require('./utils')
const { resolve } = utils

const config = merge(baseConfig, {
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  mode: 'development'
})

module.exports = config
