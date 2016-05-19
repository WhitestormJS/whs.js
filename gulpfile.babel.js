import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import del from 'del';

const $ = loadPlugins();

const src = 'src/**/*';
const dest = 'lib';

const isProduction = process.env.NODE_ENV == 'production';

process.env.BABEL_ENV = 'node';

// default task
gulp.task('default', ['build']);

gulp.task('build', (callback) => {
    runSequence('clean', 'babel', callback);
});

gulp.task('babel', () => {
    return gulp.src(src)
        .pipe($.cached('babel', {optimizeMemory: true}))
        .pipe($.if(!isProduction, $.sourcemaps.init()))
        .pipe($.babel())
        .on('error', onBuildError)
        .pipe($.if(!isProduction, $.sourcemaps.write('.')))
        .pipe(gulp.dest(dest));
});

gulp.task('clean', (callback) => {
  del(dest).then(() => callback());
});

function onBuildError({name, message, codeFrame}) {
    let errorMessage = `${$.util.colors.red(name)} ${message}\n${codeFrame}`;

    $.util.log('[babel]', errorMessage);
    this.emit('end');
}
