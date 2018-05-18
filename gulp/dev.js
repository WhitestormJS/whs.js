import path from 'path';
import fs from 'fs';
import gulp from 'gulp';
import express from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import {argv} from 'yargs';
import sass from 'gulp-sass';
import watch from 'gulp-watch';
import MarkdownIt from 'markdown-it';
import pug from 'pug';
import hljs from 'highlight.js';

import {exampleCompilerInstance} from './compilers';
import {parseExamplesStructure} from './utils';
import {getTemplateData, examples} from './config';

gulp.task('sass:watch', () => {
  return gulp.src('./examples/assets/scss/*.scss')
    .pipe(watch('./examples/assets/scss/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('./examples/assets/css/'));
});

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

// DEV MODE
gulp.task('dev', () => {
  const app = express();
  const templateData = getTemplateData({devPhysics: process.env.DEV_PHYSICS, devMode: true});

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
    }
  };

  const exampleCompiler = exampleCompilerInstance({
    path: {
      ammojs: templateData.ammojs,
      assets: templateData.assets
    }
  });

  let data = parseExamplesStructure();

  app.use(new WebpackDevMiddleware(
    exampleCompiler(data.paths),
    {
      contentBase: examples,
      publicPath: '/',
      logLevel: 'debug'
      // noInfo: true
    }
  ));

  app.use('/assets', express.static(path.resolve(__dirname, `${examples}/assets`)));
  app.use('/build', express.static('build'));
  app.use('/modules', express.static('modules'));

  app.set('views', path.resolve(__dirname, `./${examples}`));
  app.set('view engine', 'pug');
  app.set('view cache', false);

  app.get('/', (req, res) => {
    data = parseExamplesStructure();
    Object.assign(templateData, data);

    res.render(`./index.pug`, templateData);
  });

  app.get('/examples*', (req, res) => {
    console.log(req.path.replace('/examples', ''));
    res.redirect(req.path.replace('/examples', ''));
  });

  app.get('/:name', (req, res) => {
    res.render(`./${req.params.name}.pug`, templateData);
  });

  app.get('/:category/:category2/:name', (req, res) => {
    res.render(`./${req.params.category}/${req.params.category2}/${req.params.name}/index.pug`, templateData);
  });

  app.get('/:category/:name', (req, res) => {
    res.render(`./${req.params.category}/${req.params.name}/index.pug`, templateData);
  });

  app.listen(8080);

  gulp.start('sass:watch');
});
