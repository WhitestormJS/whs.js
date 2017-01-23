import gulp from 'gulp';
import karma from 'karma';

// TESTING
gulp.task('test', ['test:benchmark', 'test:unit']);

gulp.task('test:benchmark', done => {
  new karma.Server({
    configFile: `${__dirname}../test/karma.benchmark.conf.js`
  }, () => {
    done();
  }).start();
});

gulp.task('test:unit', done => {
  new karma.Server({
    configFile: `${__dirname}../test/karma.unit.conf.js`
  }, () => {
    done();
  }).start();
});
