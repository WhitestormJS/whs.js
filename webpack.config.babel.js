import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

process.env.BABEL_ENV = 'browser';

export function config({isProduction, frameworkSrc, frameworkDest}) {
  if (process.env.CI) isProduction = true;
  console.log(isProduction ? 'Production mode' : 'Development mode');
  const _version = require('./package.json').version;
  console.log(_version);

  const loadersSection = [
    {
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /ammo\.js/
      ],
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: [
          ['transform-runtime', {polyfill: false}],
          'add-module-exports',
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-object-rest-spread'
        ],
        presets: ['es2015']
      }
    }
  ];

  const bannerText = `WhitestormJS Framework v${_version}`;

  const pluginsSectionPhysics = isProduction
  ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        hoist_funs: false, // Turn this off to prevent errors with Ammo.js
        warnings: false
      },
      minimize: true
    }),
    new HappyPack({loaders: ['babel'], threads: 4}),
    new webpack.NormalModuleReplacementPlugin(/inline\-worker/, 'webworkify-webpack'),
    new webpack.BannerPlugin(bannerText)
  ]
  : [
    new HappyPack({loaders: ['babel'], threads: 4}),
    new webpack.NormalModuleReplacementPlugin(/inline\-worker/, 'webworkify-webpack'),
    new webpack.BannerPlugin(bannerText)
  ];

  const pluginsSectionLight = isProduction
  ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      minimize: true
    }),
    new HappyPack({loaders: ['babel'], threads: 4}),
    new webpack.BannerPlugin(bannerText)
  ]
  : [
    new HappyPack({loaders: ['babel'], threads: 4}),
    new webpack.BannerPlugin(bannerText)
  ];

  return [{ // PHYSICS VERSION
    devtool: isProduction ? false : 'source-map',
    cache: true,
    entry: [
      'babel-polyfill',
      `${frameworkSrc}/index.js`
    ],
    target: 'web',
    output: {
      path: path.join(__dirname, frameworkDest),
      filename: 'whitestorm.js',
      library: 'WHS',
      libraryTarget: 'umd'
    },
    module: {
      loaders: loadersSection
    },
    plugins: pluginsSectionPhysics
  }, { // LIGHT VERSION
    devtool: isProduction ? false : 'source-map',
    cache: true,
    entry: [
      'babel-polyfill',
      `${frameworkSrc}/index.js`
    ],
    target: 'web',
    output: {
      path: path.join(__dirname, frameworkDest),
      filename: 'whitestorm.light.js',
      library: 'WHS',
      libraryTarget: 'umd'
    },
    externals: [
      function(ctx, req, cb) {
        if (/.*\/physics.*/g.test(req)) return cb(null, 'var false');
        cb();
      }
    ],
    module: {
      loaders: loadersSection
    },
    plugins: pluginsSectionLight
  }];
}
