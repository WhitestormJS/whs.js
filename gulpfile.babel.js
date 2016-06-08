import path from 'path';
import gulp from 'gulp';
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
import gbrowser from 'gulp-browser';
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

gulp.task('dev', ['examples:watch'], () => {
  const server = new WebpackDevServer(webpackCompiler, {
    contentBase: examplesDest,
    publicPath: '/build/',

    stats: {colors: true}
  });

  server.listen(8080, 'localhost', () => {});
});

gulp.task('examples:watch', () => {
  const watcher = gulp.watch(examplesSources, (obj) => {
    if (obj.type === 'changed') {
      if (path.extname(obj.path) === '.js') {
        console.log('.js change deleted.');
        const filePath = path.relative(path.resolve('./'), obj.path);

        gulp.src([
          obj.path,
          `!${examplesDev}/libs/**/*`,
          `!${examplesDev}/assets/**/*.js`
        ])
          .pipe(swig(Object.assign({}, swigOpts, {ext: '.js'})))
          .pipe(gbrowser.browserify({
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
        console.log('.html change deleted.');
        const filePath = path.relative(path.resolve('./'), obj.path);

        gulp.src(filePath)
          .pipe(swig(swigOpts))
          .pipe(
            gulp.dest(
              path.join(
                path.relative(path.resolve('./'), path.resolve(examplesDest)),
                path.relative(path.resolve(examplesDev), path.dirname(obj.path))
              )
            )
          );

        console.log(`Swig: ${filePath}`);
      } else {
        console.log('Other file change deleted.');
        const filePath = path.relative(path.resolve('./'), obj.path);

        gulp.src([
          filePath,
          `!${examplesDev}/**/*.html`,
          `!${examplesDev}/!(libs)/*.js`,
          `!${examplesDev}/**/script.js`,
          `${examplesDev}/libs/**/*`,
          `${examplesDev}/assets/**/*.js`
        ])
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

gulp.task('examples', () => {
  gulp.src([
    `${examplesDev}/**/*`,
    `!${examplesDev}/**/*.html`,
    `!${examplesDev}/!(libs)/*.js`,
    `!${examplesDev}/**/script.js`,
    `${examplesDev}/libs/**/*`,
    `${examplesDev}/assets/**/*.js`
  ])
  .pipe(gulp.dest(examplesDest));

  gulp.src([
    `${examplesDev}/**/*.js`,
    `!${examplesDev}/**/*.html`,
    `!${examplesDev}/libs/**/*`,
    `!${examplesDev}/assets/**/*.js`
  ])
  .pipe(swig(Object.assign({}, swigOpts, {ext: '.js'})))
  .pipe(gbrowser.browserify({
    transform: 'babelify',
    options: {presets: ['es2015']}
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
