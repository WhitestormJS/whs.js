import path from 'path';
import webpack from 'webpack';

export const exampleCompilerInstance =
  (options = {path: {ammojs: '', assets: ''}}) =>
    (paths, isDev = true) => webpack({
      entry: paths.reduce((a, p) =>
        Object.assign(a, {[p]: `./examples/${p}/script.js`}),
      {}),
      mode: 'development',
      output: {
        path: path.resolve(__dirname, '../examples/'),
        filename: '[name]/bundle.js'
      },
      // module: {
      //   loaders: [{
      //     loader: 'babel-loader',
      //     query: {
      //       cacheDirectory: true,
      //       plugins: [
      //         // ['transform-runtime', {polyfill: false}],
      //         'transform-object-rest-spread'
      //       ],
      //       presets: [['es2015', {modules: false}]]
      //     }
      //   }]
      // },
      resolve: {
        alias: {
          '@api': path.resolve(__dirname, '../examples/api'),
          '@utils': path.resolve(__dirname, '../examples/utils')
        }
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
