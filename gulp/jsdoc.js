import jsdoc from 'gulp-jsdoc3';
import gulp from 'gulp';

gulp.task('build', function (cb) {
    const config = require('../jsdoc.json');
    gulp.src(['README.md', './src/**/*.js'], {read: false})
      .pipe(jsdoc(config, cb));
});
