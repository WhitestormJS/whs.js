// UTILS
import path from 'path';
import del from 'del';
import {argv} from 'yargs';
import express from 'express';
import serveIndex from 'serve-index';
import fs from 'fs';

// GULP
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

// WEBPACK & KARMA
import karma from 'karma';
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';

import {config} from './webpack.config.babel.js';
import wConfig from './test/webpack/webpack.config.js';
if (argv.devPhysics) console.log(`DevPhysics is running on: ${argv.devPhysics} port`);

// SETTINGS
const
  frameworkSrc = './src/framework',
  frameworkDest = './build',

  examplesDev = './src/examples',
  examplesSrc = `${examplesDev}/**/*`,
  examplesDest = './examples',

  templateData = {
    assets: '../../assets',
    physicsModule: argv.devPhysics ?
      `http://localhost:${argv.devPhysics}/physics-module.js`
      : '../../../vendor/physics-module.js',
    ammojs: argv.devPhysics ?
      `http://localhost:${argv.devPhysics}/vendor/ammo.js`
      : '../../../vendor/ammo.js'
  };

const $ = loadPlugins({
  rename: {
    'gulp-browser-basedir': 'gbrowser'
  }
});

// COMPILERS
const isProduction = argv.prod ? true : process.env.NODE_ENV === 'production';

const webpackConfiguration = config({
  isProduction,
  frameworkSrc,
  frameworkDest
});

const webpackCompiler = webpack(webpackConfiguration[0]);
const webpackCompilerLight = webpack(webpackConfiguration[1]);
const wCompiler = webpack(wConfig); // Webpack test.

// ENVIRONMENT  SETUP
process.env.BABEL_ENV = 'node';

// ALIAS
gulp.task('default', ['build']);
gulp.task('build', ['src:build', 'examples:build']);
gulp.task('src:build', ['src:build:browser', 'src:build:node']);

// BUILD: browser
gulp.task('src:build:browser', ['build:clean'], (callback) => {
  webpackCompiler.run((error, stats) => {
    if (error) throw new $.util.PluginError('webpack', error);
    $.util.log('[webpack]', stats.toString({colors: true}));

    if (!argv.main)
      webpackCompilerLight.run((error, stats) => {
        if (error) throw new $.util.PluginError('webpack', error);
        $.util.log('[webpack]', stats.toString({colors: true}));
        callback();
      });
  });
});

gulp.task('src:build:node', () => {
  gulp.src(`${frameworkSrc}/**/*`)
    .pipe($.cached('babel', {optimizeMemory: true}))
    .pipe($.babel({
      "presets": [
        "es2015"
      ],
      "plugins": [
        "transform-runtime",
        "add-module-exports",
        "transform-decorators-legacy",
        "transform-class-properties",
        "transform-object-rest-spread"
      ]
    }))
    .on('error', makeBuildErrorHandler('babel'))
    .pipe(gulp.dest('./lib/'));

});

// DEV MODE
gulp.task('dev', () => {
  const app = express();

  app.use(new WebpackDevMiddleware(webpackCompiler, {
    contentBase: examplesDest,
    publicPath: '/build/',

    stats: {colors: true}
  }));

  const getPaths = () => {
    const categories = [];
    const paths = [];
    const excludeFolders = ['_assets'];

    const handleFolders = (folder, callback) => {
      fs.readdirSync(folder).filter(file => {
        if (excludeFolders.includes(file)) return;
        if (fs.statSync(path.join(folder, file)).isDirectory()) callback(file);
      });
    }

    handleFolders('./examples/', category => {
      categories.push(category);

      handleFolders(path.join('./examples/', category), name => {
        paths.push(`${category}/${name}`);
      });
    });

    return [paths, categories];
  }

  const configExtend = {
    output: {
      path: '/',
      filename: 'script.js'
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
        'process.ammoPath': `'${templateData.ammojs}'`,
        'process.assetsPath': `'${templateData.assets}'`
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
  };

  const exampleCompiler = (path) => webpack({
    entry: `./examples/${path}/script.js`,
    output: configExtend.output,
    module: configExtend.module,
    plugins: configExtend.plugins
  });

  const paths = getPaths();
  templateData.paths = paths[0];
  templateData.categories = paths[1];

  paths[0].forEach((path) => {
    app.use(new WebpackDevMiddleware(
      exampleCompiler(path),
      {
        contentBase: examplesDest,
        publicPath: `/${path}`,
        noInfo: true,
        stats: configExtend.stats
      }
    ));
  });

  app.use('/assets', express.static(path.resolve(__dirname, `${examplesDest}/_assets`)));

  app.get('/vendor/physics-module.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './vendor/physics-module.js'));
  });

  app.set('views', path.resolve(__dirname, `./${examplesDest}`));
  app.set('view engine', 'pug');
  app.set('view cache', false);

  app.get('/', (req, res) => {
    res.render(`./index.pug`, templateData);
  });

  app.get('/:name', (req, res) => {
    res.render(`./${req.params.name}.pug`, templateData);
  });

  app.get('/:category/:name', (req, res) => {
    res.render(`./${req.params.category}/${req.params.name}/index.pug`, templateData);
  });

  app.listen(8080, 'localhost', () => {});
});

// DEV MODE
gulp.task('webpack-dev', () => {
  const server = new WebpackDevMiddleware(wCompiler, {
    contentBase: './test/webpack/',
    publicPath: '/build/',

    stats: {colors: true}
  });

  server.listen(8001, 'localhost', () => {});
});

// EXAMPLES: WATCH
// gulp.task('examples:watch', () => {
//   const watcher = gulp.watch(examplesSrc, (obj) => {
//     if (obj.type === 'changed') {
//       if (path.extname(obj.path) === '.js') {
//         console.log('.js change detected.');
//         const filePath = path.relative(path.resolve('./'), obj.path);

//         gulp.src([
//           obj.path,
//           `!${examplesDev}/_assets/**/*.js`
//         ])
//           .pipe($.plumber())
//           .pipe($.swig(Object.assign({}, swigParameters, {ext: '.js'})))
//           .pipe($.gbrowser.browserify({basedir: path.resolve(examplesDev)}, {
//             transform: 'babelify',
//             options: {presets: ['es2015']}
//           }))
//           .pipe(
//             gulp.dest(
//               path.join(
//                 path.relative(path.resolve('./'), path.resolve(examplesDest)),
//                 path.relative(path.resolve(examplesDev), path.dirname(obj.path))
//               )
//             )
//           );

//         console.log(`Swig, babelify & browserify: ${filePath}`);
//       } else if (path.extname(obj.path) === '.html') {
//         console.log('.html change detected.');
//         const filePath = path.relative(path.resolve('./'), obj.path);

//         if (obj.path.indexOf('layout') > -1) {
//           gulp.src([
//             `${examplesDev}/**/*.html`
//           ])
//             .pipe($.plumber())
//             .pipe($.swig(swigParameters))
//             .pipe(
//               gulp.dest(
//                 path.join(
//                   path.relative(path.resolve('./'), path.resolve(examplesDest)),
//                   path.relative(path.resolve(examplesDev), path.dirname(obj.path))
//                 )
//               )
//             );

//           console.log(`Swig LAYOUT: ${filePath}`);
//         } else {
//           gulp.src(filePath)
//             .pipe($.plumber())
//             .pipe($.swig(swigParameters))
//             .pipe(
//               gulp.dest(
//                 path.join(
//                   path.relative(path.resolve('./'), path.resolve(examplesDest)),
//                   path.relative(path.resolve(examplesDev), path.dirname(obj.path))
//                 )
//               )
//             );
//         }

//         console.log(`Swig: ${filePath}`);
//       } else {
//         console.log('Other file change detected.');
//         const filePath = path.relative(path.resolve('./'), obj.path);

//         gulp.src([
//           filePath,
//           `!${examplesDev}/**/*.html`,
//           `!${examplesDev}/!(_libs)/*.js`,
//           `!${examplesDev}/**/script.js`,
//           `${examplesDev}/_assets/**/*.js`
//         ])
//           .pipe($.plumber())
//           .pipe(
//             gulp.dest(
//               path.join(
//                 path.relative(path.resolve('./'), path.resolve(examplesDest)),
//                 path.relative(path.resolve(examplesDev), path.dirname(obj.path))
//               )
//             )
//           );

//         console.log(`File copied: ${filePath}`);
//       }
//     }
//   });

//   watcher.on('change', (event) => {
//     if (event.type === 'deleted') {
//       // Simulating the {base: 'src'} used with gulp.src in the scripts task
//       const filePathFromSrc = path.relative(path.resolve(examplesDev), event.path);

//       // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
//       const destFilePath = path.resolve(examplesDest, filePathFromSrc);

//       del.sync(destFilePath);
//     }
//   });
// });

// gulp.task('examples:watch', () => {

// });

// EXAMPLES: BUILD
gulp.task('examples:build', ['examples:clean'], () => {
  gulp.src([
    `${examplesDev}/**/*`,
    `!${examplesDev}/**/*.html`,
    `!${examplesDev}/!(_libs)/*.js`,
    `!${examplesDev}/**/script.js`,
    `${examplesDev}/_assets/**/*.js`
  ])
    .pipe($.plumber())
    .pipe(gulp.dest(examplesDest));

  gulp.src([
    `${examplesDev}/**/*.js`,
    `!${examplesDev}/**/*.html`,
    `!${examplesDev}/_assets/**/*.js`
  ])
    .pipe($.plumber())
    .pipe($.swig(Object.assign({}, swigParameters, {ext: '.js'})))
    .pipe($.gbrowser.browserify({basedir: path.resolve(examplesDev)}, {
      transform: 'babelify',
      options: {presets: ['es2015']}
    }))
    .pipe(gulp.dest(examplesDest));

  gulp.src(`${examplesDev}/**/*.html`)
    .pipe($.plumber())
    .pipe($.swig(swigParameters))
    .pipe(gulp.dest(examplesDest));
});

// TESTING
gulp.task('test', ['test:benchmark', 'test:unit']);

gulp.task('test:benchmark', done => {
  new karma.Server({
    configFile: `${__dirname}/test/karma.benchmark.conf.js`
  }, () => {
    done();
  }).start();
});

gulp.task('test:unit', done => {
  new karma.Server({
    configFile: `${__dirname}/test/karma.unit.conf.js`
  }, () => {
    done();
  }).start();
});

// LINT
gulp.task('src:lint', () => {
  gulp.src(`${frameworkSrc}/**/*`)
    .pipe($.cached('lint', {optimizeMemory: true}))
    .pipe($.xo())
    .on('error', makeBuildErrorHandler('lint'));
});

// CLEANING
gulp.task('examples:clean', (callback) => {
  del(examplesDest).then(() => callback());
});

gulp.task('build:clean', (callback) => {
  del([`${frameworkDest}/*.js`, `${frameworkDest}/*.map`, './lib/**/*.js', './lib/**/*.map']).then(() => callback());
});

// ERRORS
function makeBuildErrorHandler(taskName) {
  return function ({name, message, codeFrame}) {
    $.util.log(`[${taskName}]`, `${$.util.colors.red(name)} ${message}${codeFrame ? `\n${codeFrame}` : ''}`);
    this.emit('end');
  };
}
