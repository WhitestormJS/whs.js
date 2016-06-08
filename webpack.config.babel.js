import {join} from 'path';
import webpack from 'webpack';

process.env.BABEL_ENV = 'browser';

function config({production}) {
  return {
    devtool: production ? 'hidden-source-map' : 'eval-source-map',
    entry: './src/index.js',
    output: {
      path: join(__dirname, 'build'),
      filename: 'whitestorm.js',
      library: 'WHS',
      libraryTarget: 'var'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel'
        }
      ]
    },
    plugins: production
      ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          compress: {
            warnings: false
          }
        }),
        new webpack.ProvidePlugin({
          THREE: 'three'
        })
      ]
      : []
  };
}

export {
  config as default
};
