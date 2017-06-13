import jsdoc from 'gulp-jsdoc3';
import gulp from 'gulp';
import config from '../jsdoc';

gulp.task('doc:build', cb => {
  gulp.src(['README.md', './src/**/*.js'], {read: false})
    .pipe(jsdoc(config, cb));
});
