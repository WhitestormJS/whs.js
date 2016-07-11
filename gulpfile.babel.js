import path from 'path';
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import del from 'del';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import swig from 'gulp-swig';
import gbrowser from 'gulp-browser-basedir';
import plumber from 'gulp-plumber';
import benchmark from 'gulp-benchmark';
import karma from 'karma';

import {config, light_config} from './webpack.config.babel.js';

const isProduction = process.env.NODE_ENV === 'production';

const $ = loadPlugins();
const webpackCompiler = webpack(config({production: isProduction}));
const lightWebpackCompiler = webpack(light_config({production: isProduction}));

// ========= SETTINGS =========
const src = 'src/**/*',
  dest = 'lib',
  examplesDev = 'src-examples',
  examplesSources = `${examplesDev}/**/*`,
  examplesDest = 'examples',
  swigOpts = {
    defaults: {
      cache: false,

      locals: {
        assets: '../../_assets',
        libs: '../../_libs'
      }
    }
  },
  testFile = 'test/benchmark/benchmark.js',
  KarmaServer = karma.Server;

// ==== ENVIRONMENT  SETUP ====
process.env.BABEL_ENV = 'node';

gulp.task('default', ['examples:build', 'src:build']);

gulp.task('src:build', (callback) => {
  runSequence('src:clean', 'src:build:node', 'src:build:browser', callback);
});

// ===== BUILD:  node.js =====
gulp.task('src:build:node', () => {
  return gulp.src(src)
    .pipe($.cached('babel', {optimizeMemory: true}))
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.babel())
    .on('error', makeBuildErrorHandler('babel'))
    .pipe($.if(!isProduction, $.sourcemaps.write('.')))
    .pipe(gulp.dest(dest));
});

// ===== BUILD: browser =====
gulp.task('src:build:browser', (callback) => {
  webpackCompiler.run((error, stats) => {
    if (error) throw new $.util.PluginError('webpack', error);
    $.util.log('[webpack]', stats.toString({colors: true}));

    lightWebpackCompiler.run((error, stats) => {
      if (error) throw new $.util.PluginError('webpack', error);
      $.util.log('[webpack]', stats.toString({colors: true}));
      callback();
    });
  });
});

// ======== DEV MODE ========
gulp.task('dev', ['examples:watch'], () => {
  const server = new WebpackDevServer(webpackCompiler, {
    contentBase: examplesDest,
    publicPath: '/build/',

    stats: {colors: true}
  });

  server.listen(8080, 'localhost', () => {});
});

// ==== EXAMPLES:  WATCH ====
gulp.task('examples:watch', () => {
  const watcher = gulp.watch(examplesSources, (obj) => {
    if (obj.type === 'changed') {
      if (path.extname(obj.path) === '.js') {
        console.log('.js change detected.');
        const filePath = path.relative(path.resolve('./'), obj.path);

        gulp.src([
          obj.path,
          `!${examplesDev}/_libs/**/*`,
          `!${examplesDev}/_assets/**/*.js`
        ])
          .pipe(plumber())
          .pipe(swig(Object.assign({}, swigOpts, {ext: '.js'})))
          .pipe(gbrowser.browserify({basedir: path.resolve(examplesDev)}, {
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
            .pipe(plumber())
            .pipe(swig(swigOpts))
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
            .pipe(plumber())
            .pipe(swig(swigOpts))
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
          `${examplesDev}/_libs/**/*`,
          `${examplesDev}/_assets/**/*.js`
        ])
          .pipe(plumber())
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

// ==== EXAMPLES:  BUILD ====
gulp.task('examples:build', ['examples:clean'], () => {
  gulp.src([
    `${examplesDev}/**/*`,
    `!${examplesDev}/**/*.html`,
    `!${examplesDev}/!(_libs)/*.js`,
    `!${examplesDev}/**/script.js`,
    `${examplesDev}/_libs/**/*`,
    `${examplesDev}/_assets/**/*.js`
  ])
    .pipe(plumber())
    .pipe(gulp.dest(examplesDest));

  gulp.src([
    `${examplesDev}/**/*.js`,
    `!${examplesDev}/**/*.html`,
    `!${examplesDev}/_libs/*.js`,
    `!${examplesDev}/_assets/**/*.js`
  ])
    .pipe(plumber())
    .pipe(swig(Object.assign({}, swigOpts, {ext: '.js'})))
    .pipe(gbrowser.browserify({basedir: path.resolve(examplesDev)}, {
      transform: 'babelify',
      options: {presets: ['es2015']}
    }))
    .pipe(gulp.dest(examplesDest));

  gulp.src(`${examplesDev}/**/*.html`)
    .pipe(plumber())
    .pipe(swig(swigOpts))
    .pipe(gulp.dest(examplesDest));
});

// ====== TEST ======
gulp.task('src:test', (done) => {
  new KarmaServer({
    configFile: `${__dirname}/test/karma.conf.js`
  }, () => {
    done();
  }).start();
});

// ====== LINT ======
gulp.task('src:lint', () => {
  gulp.src(src)
    .pipe($.cached('lint', {optimizeMemory: true}))
    .pipe($.xo())
    .on('error', makeBuildErrorHandler('lint'));
});


// ==== CLEANING ====
gulp.task('src:clean', (callback) => {
  del(dest).then(() => callback());
});

gulp.task('examples:clean', (callback) => {
  del(examplesDest).then(() => callback());
});

// ===== ERRORS =====
function makeBuildErrorHandler(taskName) {
  return function ({name, message, codeFrame}) {
    $.util.log(`[${taskName}]`, `${$.util.colors.red(name)} ${message}${codeFrame ? `\n${codeFrame}` : ''}`);
    this.emit('end');
  };
}
