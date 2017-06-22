import jsdoc from 'gulp-jsdoc3';
import gulp from 'gulp';
import watch from 'gulp-watch';
import config from '../jsdoc';
import less from 'gulp-less';
import del from 'del';
import {argv} from 'yargs';

gulp.task('docs', cb => {
  del('./docs/public/*.html');

  gulp.src('./docs/template/static/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./docs/public/styles/'));

  gulp.src(['./docs/data/**/*', argv.all ? './src/**/*.js' : './src/core/Component.js'])
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
    './docs/template/publish.js',
    './docs/data/**/*',
    './src/core/*.js'
  ], () => {
    del('./docs/public/*.html');
    console.log(`update #${i++}`);

    gulp.src(['./docs/data/**/*.md', argv.all ? './src/**/*.js' : './src/core/Component.js'])
      .pipe(jsdoc(config));
  });
});
