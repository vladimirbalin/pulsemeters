const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: ['@babel/polyfill', './js/script.js'],
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node-modules/,
      loader: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ]
        }
      }
    }]
  }

};