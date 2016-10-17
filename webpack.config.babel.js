import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import OptimizeJSPlugin from 'webpack-optimizejs-plugin';

process.env.BABEL_ENV = 'browser';

export function config({isProduction, frameworkSrc, frameworkDest}) {
  console.log(isProduction ? 'Production mode' : 'Development mode');

  const loadersSection = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      happy: { id: 'js' }
    }
  ];

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
    new HappyPack({id: 'js', threads: 4}),
    new webpack.NormalModuleReplacementPlugin(/inline\-worker/, 'webworkify-webpack')
  ]
  : [
    new HappyPack({id: 'js', threads: 4}),
    new webpack.NormalModuleReplacementPlugin(/inline\-worker/, 'webworkify-webpack')
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
    new OptimizeJSPlugin()
  ]
  : [
    new HappyPack({loaders: ['babel'], threads: 4}),
    new OptimizeJSPlugin()
  ];

  return [{ // PHYSICS VERSION
    devtool: isProduction ? false : 'source-map',
    entry: ['babel-polyfill', `${frameworkSrc}/index.js`],
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
    entry: ['babel-polyfill', `${frameworkSrc}/index.js`],
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
