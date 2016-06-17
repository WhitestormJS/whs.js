import path from 'path';
import webpack from 'webpack';

process.env.BABEL_ENV = 'browser';

function config({production}) {
  return {
    devtool: production ? 'hidden-source-map' : 'source-map',
    entry: './src/index.js',
    target: 'web',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'whitestorm.js',
      library: 'WHS',
      libraryTarget: 'var'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'string-replace',
          query: {
            search: 'from \'inline-worker\';',
            replace: 'from \'webworkify-webpack\';'
          }
        },
        {
          test: /\.js$/,
          loader: 'string-replace',
          query: {
            search: 'new Worker(require(\'./worker.js\'));',
            replace: 'Worker(require(\'./worker.js\'));'
          }
        },
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
