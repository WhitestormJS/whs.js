import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import DashboardPlugin from 'webpack-dashboard/plugin';

export function config(
    {
      isProduction,
      src,
      dest,
      filename = 'whitestorm.js',
      plugins = [],
      compact = false,
      version = require('./package.json').version
    }
) {
  if (process.env.CI) isProduction = true;
  console.log(`Mode: ${isProduction ? 'production' : 'development'}`);
  console.log(`Version: ${version}`);

  const bannerText = `WhitestormJS Framework v${version}${compact ? ' compact' : ''}`;

  return { // PHYSICS VERSION
    devtool: isProduction ? false : 'source-map',
    cache: true,
    entry: [
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
      ],
      alias: {
        three$: path.join(__dirname, './node_modules/three/build/three.module.js')
      }
    }
  };
}

export default config({
  isProduction: process.env.NODE_ENV === 'production',
  src: './src',
  dest: './build'
});
