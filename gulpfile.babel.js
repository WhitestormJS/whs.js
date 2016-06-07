import gulp from 'gulp';
import path from 'path';
import loadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import del from 'del';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import rollup from 'gulp-rollup';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import swig from 'gulp-swig';
import browserify from 'gulp-browserify';
import webpackConfig from './webpack.config.babel.js';

const isProduction = process.env.NODE_ENV === 'production';

const $ = loadPlugins();
const webpackCompiler = webpack(webpackConfig({production: isProduction}));

// Globals.
const src = 'src/**/*',
  dest = 'lib',
  examplesDev = 'examples_src',
  examplesSources = `${examplesDev}/**/*`,
  examplesDest = 'examples',
  swigOpts = {
    data: {
      assets: '../assets'
    },

    defaults: {
      cache: false,

      locals: {
        assets: '../../assets',
        libs: '../../libs'
      }
    }
  };

// Browser.
const srcIndex = 'src/index.js';
process.env.BABEL_ENV = 'node';

gulp.task('default', ['build']);

gulp.task('build', (callback) => {
  runSequence('clean', 'babel', callback);
});

gulp.task('babel', () => {
  return gulp.src(src)
    .pipe($.cached('babel', {optimizeMemory: true}))
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.babel())
    .on('error', makeBuildErrorHandler('babel'))
    .pipe($.if(!isProduction, $.sourcemaps.write('.')))
    .pipe(gulp.dest(dest));
});

gulp.task('webpack', (callback) => {
  webpackCompiler.run((error, stats) => {
    if (error) throw new $.util.PluginError('webpack', error);
    $.util.log('[webpack]', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('dev', () => {
  const server = new WebpackDevServer(webpackCompiler, {
    contentBase: examplesDest,
    publicPath: '/build/',

    stats: {colors: true}
  });

  server.listen(8080, 'localhost', () => {});

  const watcher = gulp.watch(examplesSources, () => {
    gulp.src([
      `${examplesDev}/**/*`,
      `!${examplesDev}/**/*.html`,
      `!${examplesDev}/!(libs)/*.js`,
      `!${examplesDev}/**/index.js`,
      `${examplesDev}/libs/**/*`,
      `${examplesDev}/assets/**/*.js`
    ])
    .pipe(gulp.dest(examplesDest));

    gulp.src([
      `${examplesDev}/**/*.js`,
      `!${examplesDev}/**/index.js`,
      `!${examplesDev}/libs/**/*`,
      `!${examplesDev}/assets/**/*.js`
    ])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(gulp.dest(examplesDest));

    gulp.src(`${examplesDev}/**/index.js`)
      .pipe(swig(swigOpts))
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(browserify({
        insertGlobals: true,
        debug: !gulp.env.production
      }))
      .pipe(gulp.dest(examplesDest));

    gulp.src(`${examplesDev}/**/*.html`)
      .pipe(swig(swigOpts))
      .pipe(gulp.dest(examplesDest));
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

gulp.task('examples', () => {
  gulp.src([
    `${examplesDev}/**/*`,
    `!${examplesDev}/**/*.html`,
    `!${examplesDev}/!(libs)/*.js`,
    `!${examplesDev}/**/index.js`,
    `${examplesDev}/libs/**/*`,
    `${examplesDev}/assets/**/*.js`
  ])
  .pipe(gulp.dest(examplesDest));

  gulp.src([
    `${examplesDev}/**/*.js`,
    `!${examplesDev}/**/index.js`,
    `!${examplesDev}/libs/**/*`,
    `!${examplesDev}/assets/**/*.js`
  ])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(browserify({
    insertGlobals: true,
    debug: !gulp.env.production
  }))
  .pipe(gulp.dest(examplesDest));

  gulp.src(`${examplesDev}/**/index.js`)
    .pipe(swig(swigOpts))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    }))
    .pipe(gulp.dest(examplesDest));

  gulp.src(`${examplesDev}/**/*.html`)
    .pipe(swig(swigOpts))
    .pipe(gulp.dest(examplesDest));
});

gulp.task('rollup', () => {
  return gulp.src(srcIndex)
    .pipe(babel())
    .pipe(rollup({
      moduleName: 'WHS',
      format: 'iife',
      globals: {
        three: 'THREE'
      },
      plugins: [
        nodeResolve({
          jsnext: false,
          main: true,
          browser: false,
          preferBuiltins: false,

          skip: ['three']
        }),
        commonjs()
      ],
      outro: 'window.Physijs = Physijs;'
    }))
    .pipe(rename('whitestorm.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('lint', () => {
  gulp.src(src)
    .pipe($.cached('lint', {optimizeMemory: true}))
    .pipe($.xo())
    .on('error', makeBuildErrorHandler('lint'));
});

gulp.task('clean', (callback) => {
  del(dest).then(() => callback());
});

function makeBuildErrorHandler(taskName) {
  return function ({name, message, codeFrame}) {
    $.util.log(`[${taskName}]`, `${$.util.colors.red(name)} ${message}${codeFrame ? `\n${codeFrame}` : ''}`);
    this.emit('end');
  };
}
