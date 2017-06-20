import jsdoc from 'gulp-jsdoc3';
import gulp from 'gulp';
import watch from 'gulp-watch';
import config from '../jsdoc';
import less from 'gulp-less';
import del from 'del';

gulp.task('docs', cb => {
  del('./docs/public/*.html');

  gulp.src('./docs/template/static/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./docs/public/styles/'));

  gulp.src(['./docs/data/**/*', './src/**/*.js']) // ['README.md', './src/**/*.js']
    .pipe(jsdoc(config, cb));
});

gulp.task('docs:watch', ['docs'], () => {
  let i = 0;

  watch([
    './docs/template/**/*.less'
  ], () => {
    console.log(`update styles #${i++}`);

    gulp.src('./docs/template/static/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('./docs/public/styles/'));
  });

  return watch([
    './docs/template/**/*.tmpl',
    './docs/data/**/*',
    './src/core/*.js'
  ], () => {
    del('./docs/public/*.html');
    console.log(`update #${i++}`);

    gulp.src(['./docs/data/**/*.md', './src/core/Component.js', './src/core/CameraComponent.js'])
      .pipe(jsdoc(config));
  });
});
