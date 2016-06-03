import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import del from 'del';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel.js';
import rollup from 'gulp-rollup';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const isProduction = process.env.NODE_ENV === 'production';

const $ = loadPlugins();
const webpackCompiler = webpack(webpackConfig({production: isProduction}));

// NPM.
const src = 'src/**/*';
const dest = 'lib';

// Browser.
const srcIndex = 'src/index.js';
const includePathOptions = {
  paths: [
    'cameras',
    'core',
    'extensions',
    'extras',
    'lights',
    'meshes',
    'scenes',
    'utils'
  ]
};

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
