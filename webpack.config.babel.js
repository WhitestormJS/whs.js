import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

process.env.BABEL_ENV = 'browser';

export function config(
    {
      isProduction,
      src,
      dest,
      filename = 'whitestorm.js',
      plugins = [],
      compact = false
    }
) {
  if (process.env.CI) isProduction = true;
  console.log(isProduction ? 'Production mode' : 'Development mode');

  const version = require('./package.json').version;
  console.log(version);

  const bannerText = `WhitestormJS Framework v${version}${compact ? ' compact' : ''}`;

  return { // PHYSICS VERSION
    devtool: isProduction ? false : 'source-map',
    cache: true,
    entry: [
      // 'babel-polyfill',
      compact ? `${src}/compact.js` : `${src}/index.js`
    ],
    target: 'web',
    output: {
      path: path.join(__dirname, dest),
      filename,
      library: 'WHS',
      libraryTarget: 'umd'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/
          ],
          loader: 'babel-loader', // babel-loader
          query: {
            cacheDirectory: true,
            plugins: [
              ['transform-runtime', {polyfill: false}],
              'add-module-exports',
              'transform-decorators-legacy',
              'transform-class-properties',
              'transform-object-rest-spread'
            ],
            presets: [['es2015', {modules: false}]]
          }
        }
      ]
    },
    plugins: isProduction
      ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            hoist_funs: false, // Turn this off to prevent errors with Ammo.js
            warnings: false,
            dead_code: true
          },
          minimize: true
        }),
        new HappyPack({loaders: ['babel'], threads: 4}),
        new webpack.NormalModuleReplacementPlugin(/inline\-worker/, 'webworkify-webpack'),
        new webpack.BannerPlugin(bannerText),
        ...plugins
      ]
      : [
        new HappyPack({loaders: ['babel'], threads: 4}),
        new webpack.NormalModuleReplacementPlugin(/inline\-worker/, 'webworkify-webpack'),
        new webpack.BannerPlugin(bannerText),
        ...plugins
      ]
  };
}

export default config({
  isProduction: process.env.NODE_ENV === 'production',
  src: './src',
  dest: './build'
});
