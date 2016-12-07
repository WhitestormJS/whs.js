const webpack = require('webpack');

module.exports = {
  entry: './test/webpack/app.js',
  output: {
    path: __dirname + '/test/webpack/',
    filename: 'app.bundle.js'
  },
  target: 'web',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        hoist_funs: false, // Turn this off to prevent errors with Ammo.js
        warnings: false
      },
      minimize: true
    })
  ]
};
