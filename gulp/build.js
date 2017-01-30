#!/usr/bin/env node
import gulp from 'gulp';
import del from 'del';
import {argv} from 'yargs';

import {FrameworkCompilerInstance} from './compilers';
import {framework} from './config';
import {log} from './utils';

const logStart = name => log('cyan', `WEBPACK BUILD ['${name}' compiler status]: Started.`);
const logEnd = name => log('green', `WEBPACK BUILD ['${name}' compiler status]: Finished.`);

// BUILD
gulp.task('build', ['build:clean'], () => {
  const compilers = new FrameworkCompilerInstance();

  const instances = {
    main: new Promise(resolve => {
      logStart('main');
      compilers('main').run(() => resolve(logEnd('main')));
    }),
    compact: new Promise(resolve => {
      if (argv['main-only']) resolve();
      logStart('compact');
      compilers('compact').run(() => resolve(logEnd('compact')));
    })
  };

  Promise.all([instances.main, instances.compact]).then(() => process.exit(0), () => process.exit(1));
});

gulp.task('travis-build', ['build'], () => {
  if (process.env.TRAVIS) process.exit(0);
});

gulp.task('build:clean', callback => {
  del([`${framework.dest}/*.js`, `${framework.dest}/*.map`]).then(() => callback());
});
