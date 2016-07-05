import path from 'path';
import webpack from 'webpack';

process.env.BABEL_ENV = 'browser';

export function config({production}) {
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
      preLoaders: [
        {
          test: /scene\.js$/,
          loader: 'string-replace',
          query: {
            multiple: [
              {
                search: 'from \'inline-worker\';',
                replace: 'from \'webworkify-webpack\';'
              },
              {
                search: 'new Worker(require(\'../worker.js\'));',
                replace: 'Worker(require(\'../worker.js\'));'
              }
            ]
          }
        }
      ],
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

export function light_config({production}) {
  const conf = config({production});
  conf.output.filename = 'whitestorm.light.js';

  conf.module.preLoaders.push({
    test: /\.js$/,
    loader: 'string-replace',
    query: {
      multiple: [
        {
          search: 'physics/physi.js\';',
          replace: 'physics/nophysi.js\';'
        },
        {
          search: '!!\'physics\'',
          replace: 'false',
          flags: 'g'
        }
      ]
    }
  });

  return conf;
}
