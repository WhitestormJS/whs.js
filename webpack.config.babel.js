import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

process.env.BABEL_ENV = 'browser';

export function config({isProduction, frameworkSrc, frameworkDest}) {
  console.log(isProduction ? 'Production mode' : 'Development mode');

  const config = {
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
    entry: ['babel-polyfill', `${frameworkSrc}/index.js`],
    target: 'web',
    output: {
      path: path.join(__dirname, frameworkDest),
      filename: 'whitestorm.js',
      library: 'WHS',
      libraryTarget: 'var'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          happy: { id: 'js' }
        }
      ]
    },
    plugins: isProduction
      ? [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          compress: {
            warnings: false
          }
        }),
        new HappyPack({loaders: ['babel', 'string-replace'], threads: 4})
      ]
      : [
        new HappyPack({loaders: ['babel', 'string-replace'], threads: 4})
      ]
  };

  const lightConfig = Object.create(config);

  lightConfig.output.filename = 'whitestorm.light.js';
  lightConfig.module.preLoaders = [{
    test: /\.js$/,
    loader: 'string-replace',
    query: {
      multiple: [
        {
          search: 'physics/index.js\';',
          replace: 'physics/nophysi.js\';'
        },
        {
          search: '!!\'physics\'',
          replace: 'false',
          flags: 'g'
        }
      ]
    }
  }];

  return [config, lightConfig];
}