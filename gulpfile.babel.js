import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import del from 'del';

const $ = loadPlugins();
const isProduction = process.env.NODE_ENV === 'production';

const src = 'src/**/*';
const dest = 'lib';

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

gulp.task('webpack', () => {
    throw new Error('webpack task is not yet implemented.');
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
