import gulp from 'gulp';
import del from 'del';

import {FrameworkCompilerInstance} from './compilers';
import {framework} from './config';
import {log} from './utils';

const logStart = name => log('cyan', `WEBPACK BUILD ['${name}' compiler status]: Started.`);
const logEnd = name => log('green', `WEBPACK BUILD ['${name}' compiler status]: Finished.`);

// BUILD
gulp.task('build', ['build:clean'], () => {
  const compilers = new FrameworkCompilerInstance();

  logStart('main');
  compilers('main').run(() => logEnd('main'));

  // TODO: Make compilers run synchronously

  logStart('compact');
  compilers('compact').run(() => logEnd('compact'));
});

gulp.task('build:clean', callback => {
  del([`${framework.dest}/*.js`, `${framework.dest}/*.map`]).then(() => callback());
});
