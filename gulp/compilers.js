import path from 'path';
import webpack from 'webpack';
import {argv} from 'yargs';

import {config} from '../webpack.config.babel';
import {isProduction} from './utils';
import {framework} from './config';

// COMPILERS
export const FrameworkCompilerInstance = (options = {framework}) =>
  name => ({
    main: webpack(config({
      isProduction,
      src: options.framework.src,
      dest: options.framework.dest,
      ...(argv.version ? {version: argv.version} : {})
    }))
  }[name]);

export const ExampleCompilerInstance = (options = {path: {ammojs: '', assets: ''}}) => (p, isDev = true) => webpack({
  entry: `./examples/${p}/script.js`,
  output: isDev ? {
    path: '/',
    filename: 'script.js'
  } : {
    path: path.resolve('./examples/', p),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      query: {
        cacheDirectory: true,
        plugins: [
          // ['transform-runtime', {polyfill: false}],
          'transform-object-rest-spread'
        ],
        presets: [['es2015', {modules: false}]]
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.ammoPath': `${options.path.ammojs}`,
      'process.assetsPath': `${options.path.assets}`
    })
  ],
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: false
  }
});
