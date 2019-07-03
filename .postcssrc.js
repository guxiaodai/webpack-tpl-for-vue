module.exports = {
  plugins: {
    'postcss-px2rem-exclude': {
      remUnit: 32,
      exclude: /node_modules|mw/i
    }
  }
}
