// UTILS
import path from 'path';
import del from 'del';

// GULP
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

// WEBPACK & KARMA
import karma from 'karma';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {config} from './webpack.config.babel.js';

// SETTINGS
const
  frameworkSrc = './src/framework',
  frameworkDest = './build',

  examplesDev = './src/examples',
  examplesSrc = `${examplesDev}/**/*`,
  examplesDest = './examples',

  swigParameters = {
    defaults: {
      cache: false,

      locals: {
        assets: '../../_assets'
      }
    }
  };

const $ = loadPlugins({
  rename: {
    'gulp-browser-basedir': 'gbrowser'
  }
});

// COMPILERS
const isProduction = process.env.NODE_ENV === 'production';

const webpackConfiguration = config({
  isProduction,
  frameworkSrc,
  frameworkDest
});

const webpackCompiler = webpack(webpackConfiguration[0]);
const webpackCompilerLight = webpack(webpackConfiguration[1]);

// ENVIRONMENT  SETUP
process.env.BABEL_ENV = 'node';

gulp.task('default', ['examples:build', 'src:build']);

// BUILD: browser
gulp.task('src:build', ['build:clean'], (callback) => {
  webpackCompiler.run((error, stats) => {
    if (error) throw new $.util.PluginError('webpack', error);
    $.util.log('[webpack]', stats.toString({colors: true}));

    webpackCompilerLight.run((error, stats) => {
      if (error) throw new $.util.PluginError('webpack', error);
      $.util.log('[webpack]', stats.toString({colors: true}));
      callback();
    });
  });
});

// DEV MODE
gulp.task('dev', ['examples:build', 'examples:watch'], () => {
  const server = new WebpackDevServer(webpackCompiler, {
    contentBase: examplesDest,
    publicPath: '/build/',

    stats: {colors: true}
  });

  server.listen(8080, 'localhost', () => {});
});

// EXAMPLES: WATCH
gulp.task('examples:watch', () => {
  const watcher = gulp.watch(examplesSrc, (obj) => {
    if (obj.type === 'changed') {
      if (path.extname(obj.path) === '.js') {
        console.log('.js change detected.');
        const filePath = path.relative(path.resolve('./'), obj.path);

        gulp.src([
          obj.path,
          `!${examplesDev}/_assets/**/*.js`
        ])
          .pipe($.plumber())
          .pipe($.swig(Object.assign({}, swigParameters, {ext: '.js'})))
          .pipe($.gbrowser.browserify({basedir: path.resolve(examplesDev)}, {
            transform: 'babelify',
            options: {presets: ['es2015']}
          }))
          .pipe(
            gulp.dest(
              path.join(
                path.relative(path.resolve('./'), path.resolve(examplesDest)),
                path.relative(path.resolve(examplesDev), path.dirname(obj.path))
              )
            )
          );

        console.log(`Swig, babelify & browserify: ${filePath}`);
      } else if (path.extname(obj.path) === '.html') {
        console.log('.html change detected.');
        const filePath = path.relative(path.resolve('./'), obj.path);

        if (obj.path.indexOf('layout') > -1) {
          gulp.src([
            `${examplesDev}/**/*.html`
          ])
            .pipe($.plumber())
            .pipe($.swig(swigParameters))
            .pipe(
              gulp.dest(
                path.join(
                  path.relative(path.resolve('./'), path.resolve(examplesDest)),
                  path.relative(path.resolve(examplesDev), path.dirname(obj.path))
                )
              )
            );

          console.log(`Swig LAYOUT: ${filePath}`);
        } else {
          gulp.src(filePath)
            .pipe($.plumber())
            .pipe($.swig(swigParameters))
            .pipe(
              gulp.dest(
                path.join(
                  path.relative(path.resolve('./'), path.resolve(examplesDest)),
                  path.relative(path.resolve(examplesDev), path.dirname(obj.path))
                )
              )
            );
        }

        console.log(`Swig: ${filePath}`);
      } else {
        console.log('Other file change detected.');
        const filePath = path.relative(path.resolve('./'), obj.path);

        gulp.src([
          filePath,
          `!${examplesDev}/**/*.html`,
          `!${examplesDev}/!(_libs)/*.js`,
          `!${examplesDev}/**/script.js`,
          `${examplesDev}/_assets/**/*.js`
        ])
          .pipe($.plumber())
          .pipe(
            gulp.dest(
              path.join(
                path.relative(path.resolve('./'), path.resolve(examplesDest)),
                path.relative(path.resolve(examplesDev), path.dirname(obj.path))
              )
            )
          );

        console.log(`File copied: ${filePath}`);
      }
    }
  });

  watcher.on('change', (event) => {
    if (event.type === 'deleted') {
      // Simulating the {base: 'src'} used with gulp.src in the scripts task
      const filePathFromSrc = path.relative(path.resolve(examplesDev), event.path);

      // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
      const destFilePath = path.resolve(examplesDest, filePathFromSrc);

      del.sync(destFilePath);
    }
  });
});

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
  del([`${frameworkDest}/*.js`, `${frameworkDest}/*.map`]).then(() => callback());
});

// ERRORS
function makeBuildErrorHandler(taskName) {
  return function ({name, message, codeFrame}) {
    $.util.log(`[${taskName}]`, `${$.util.colors.red(name)} ${message}${codeFrame ? `\n${codeFrame}` : ''}`);
    this.emit('end');
  };
}
