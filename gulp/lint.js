import gulp from 'gulp';
import xo from 'gulp-xo';
import cached from 'gulp-cached';

import {framework} from './config';
import {makeBuildErrorHandler} from './utils';

// LINT
gulp.task('lint', () => {
  gulp.src(`${framework.src}/**/*`)
    .pipe(cached('lint', {optimizeMemory: true}))
    .pipe(xo())
    .on('error', makeBuildErrorHandler('lint'));
});
