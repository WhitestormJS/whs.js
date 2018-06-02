import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import del from 'del';
import pug from 'pug';
import sass from 'gulp-sass';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import LEVELS from './data/levels';
// import less from 'gulp-less';

import {exampleCompilerInstance} from './compilers';
import {parseExamplesStructure} from './utils';
import {getTemplateData} from './config';
import {getPaths} from './utils';

gulp.task('sass', () => {
  return gulp.src('./examples/assets/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./examples/assets/css/'));
});

gulp.task('build-copy', () => {
  return gulp.src('./build/whs.js')
    .pipe(gulp.dest('./examples/build/'));
});

gulp.task('modules-copy', () => {
  return gulp.src('./modules/*.js')
    .pipe(gulp.dest('./examples/modules/'));
});

gulp.task('examples:build', ['examples:html', 'sass', 'build-copy', 'modules-copy']);

const contentHeader = (title, date) =>
`
.uk-width-1-1
  h4.uk-comment-title.uk-margin-remove
    a.uk-link-reset(href='#') ${title}
  ul.uk-comment-meta.uk-subnav.uk-subnav-divider.uk-margin-remove-top
    li
      a(href='#') ${date}
    li
      a(href='#') Reply
`;

gulp.task('examples:html', callback => {
  const wait = [];
  const templateData = getTemplateData();

  const md = new MarkdownIt({
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    }
  });

  templateData.filters = {
    explanation(text, options) {
      if (options.file) {
        const renderFile = options.filename.replace(/(\/[^/]*\.pug)$/, '/' + options.file);
        const content = fs.readFileSync(renderFile, 'utf8');
        text = content + '\n' + text;
      }

      const title = (/\[\/\/\]:\s#\s\((title:\s)(.*)\)/g.exec(text) || [])[2]; // eslint-disable-line
      const date = (/\[\/\/\]:\s#\s\((date:\s)(.*)\)/g.exec(text) || [])[2]; // eslint-disable-line

      let markdown = md.render(text);

      console.log('options///');
      console.log(options);
      console.log('///options///');

      markdown = `
        ${pug.render(contentHeader(title, date))}
        ${markdown}
      `;

      return markdown;
    },

    levelType(_path) {
      for (const p in LEVELS) {
        if (!p) continue;

        const _match = _path.match(/(\/[^/]*)$/);

        if (_match && _match[0].indexOf(p) >= 0)
          return LEVELS[_path].toUpperCase();
      }

      return 'BEGINNER';
    }
  };

  const exampleCompiler = exampleCompilerInstance({
    path: {
      ammojs: templateData.ammojs,
      assets: templateData.assets
    }
  });

  const data = parseExamplesStructure();
  Object.assign(templateData, data);

  const compileFile = (inPath, outPath) =>
    wait.push(new Promise(resolve => fs.writeFile(
      path.resolve('./examples/', outPath),
      pug.renderFile(path.resolve('./examples/', inPath), templateData),
      resolve
    )));

  compileFile('./index.pug', './index.html');

  data.paths.forEach(p => {
    compileFile(`${p}/index.pug`, `${p}/index.html`);
  });

  wait.push(
    new Promise(resolve => {
      exampleCompiler(data.paths, false).run(() => {
        resolve();
      });
    })
  );

  Promise.all(wait).then(() => callback());
});

// CLEANING
gulp.task('examples:clean', callback => {
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
