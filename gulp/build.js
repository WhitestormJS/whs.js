#!/usr/bin/env node
import gulp from 'gulp';
import del from 'del';

import {FrameworkCompilerInstance} from './compilers';
import {framework} from './config';
import {log, isProduction} from './utils';

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

    minified: isProduction ? new Promise(resolve => {
      logStart('minified');
      compilers('minified').run(() => resolve(logEnd('minified')));
    }) : Promise.resolve()
  };

  Promise.all([instances.main, instances.minified]).then(() => process.exit(0), () => process.exit(1));
});

gulp.task('travis-build', ['build'], () => {
  if (process.env.TRAVIS) process.exit(0);
});

gulp.task('build:clean', callback => {
  del([`${framework.dest}/*.js`, `${framework.dest}/*.map`]).then(() => callback());
});
