import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import DashboardPlugin from 'webpack-dashboard/plugin';

const consoleColors = {
  reset: '\x1b[0m',
  hicolor: '\x1b[1m',
  underline: '\x1b[4m',
  inverse: '\x1b[7m',

  // foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

const log = (color, msg) => console.log(consoleColors[color], msg, consoleColors.reset);

export function config(
  {
    isProduction,
    src,
    dest,
    filename = 'whitestorm.js',
    plugins = [],
    version = require('./package.json').version
  }
) {
  if (process.env.CI) isProduction = true;
  log('red', `Mode: ${isProduction ? 'production' : 'development'}`);
  log('magenta', `Version: ${version}`);

  const bannerText = `WhitestormJS Framework v${version}`;

  return { // PHYSICS VERSION
    devtool: isProduction ? false : 'source-map',
    cache: true,
    entry: [
      `${src}/index.js`
    ],
    target: 'web',
    output: {
      path: path.join(__dirname, dest),
      filename,
      library: 'WHS',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/
          ],
          loader: 'babel-loader', // babel-loader
          query: {
            cacheDirectory: true
          }
        }
      ]
    },
    externals: {
      three: {
        commonjs: 'three',
        commonjs2: 'three',
        amd: 'three',
        root: 'THREE'
      }
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: isProduction,
        debug: !isProduction
      }),
      ...(isProduction ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true
          },

          output: {
            comments: false
          }
        })
      ] : []),
      new HappyPack({loaders: ['babel-loader'], threads: 4}),
      new webpack.BannerPlugin(bannerText),
      new DashboardPlugin(),
      ...plugins
    ],
    resolve: {
      modules: [
        path.resolve(__dirname, 'node_modules'),
        src
      ]
    }
  };
}

export default () => config({
  isProduction: process.env.NODE_ENV === 'production',
  src: './src',
  dest: './build'
});
