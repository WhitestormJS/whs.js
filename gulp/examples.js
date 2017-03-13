import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import del from 'del';
import pug from 'pug';
import less from 'gulp-less';

import {ExampleCompilerInstance} from './compilers';
import {getTemplateData} from './config';
import {getPaths} from './utils';

gulp.task('less', () => {
  return gulp.src('./examples/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./examples/css/'));
});

gulp.task('examples:build', ['less'], callback => {
  const wait = [];
  const paths = getPaths();
  const templateData = getTemplateData();

  templateData.scriptname = 'bundle.js';
  templateData.paths = paths[0];
  templateData.categories = paths[1];

  const exampleCompiler = new ExampleCompilerInstance({
    path: {
      ammojs: templateData.ammojs,
      assets: templateData.assets
    }
  });

  const compileFile = (inPath, outPath) =>
    wait.push(new Promise(resolve => fs.writeFile(
      path.resolve('./examples/', outPath),
      pug.compileFile(path.resolve('./examples/', inPath), {})(templateData),
      resolve
    )));

  compileFile('./index.pug', './index.html');

  paths[0].forEach(p => {
    compileFile(`${p}/index.pug`, `${p}/index.html`);

    wait.push(
      new Promise(resolve => {
        exampleCompiler(p, false).run(() => {
          resolve();
        });
      })
    );
  });

  Promise.all(wait).then(() => callback());
});

// CLEANING
gulp.task('examples:clean', (callback) => {
  const paths = getPaths();
  const wait = [];
  const delExample = inPath => del(path.resolve('./examples/', inPath)); // wait.push(

  paths[0].forEach(p => {
    delExample(`${p}/index.html`);
    delExample(`${p}/bundle.js`);
  });

  delExample('./index.html');

  Promise.all(wait).then(() => callback());
});
