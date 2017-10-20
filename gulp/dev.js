import path from 'path';
import gulp from 'gulp';
import express from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import {argv} from 'yargs';
import less from 'gulp-less';
import watch from 'gulp-watch';

import {ExampleCompilerInstance} from './compilers';
import {getPaths} from './utils';
import {getTemplateData, examples} from './config';

gulp.task('less:watch', () => {
  return gulp.src('./examples/assets/less/*.less')
    .pipe(watch('./examples/assets/less/*.less'))
    .pipe(less())
    .pipe(gulp.dest('./examples/assets/css/'));
});

// DEV MODE
gulp.task('dev', () => {
  const app = express();
  const templateData = getTemplateData({devPhysics: process.env.DEV_PHYSICS, devMode: true});

  const exampleCompiler = new ExampleCompilerInstance({
    path: {
      ammojs: templateData.ammojs,
      assets: templateData.assets
    }
  });

  const paths = getPaths();

  templateData.paths = paths[0];
  templateData.categories = paths[1];

  paths[0].forEach(p => {
    app.use(new WebpackDevMiddleware(
      exampleCompiler(p),
      {
        contentBase: examples,
        publicPath: `/${p}`,
        noInfo: true
      }
    ));
  });

  app.use('/assets', express.static(path.resolve(__dirname, `${examples}/assets`)));
  app.use('/build', express.static('build'));
  app.use('/modules', express.static('modules'));

  app.set('views', path.resolve(__dirname, `./${examples}`));
  app.set('view engine', 'pug');
  app.set('view cache', false);

  app.get('/', (req, res) => {
    res.render(`./index.pug`, templateData);
  });

  app.get('/examples*', (req, res) => {
    console.log(req.path.replace('/examples', ''));
    res.redirect(req.path.replace('/examples', ''));
  });

  app.get('/:name', (req, res) => {
    res.render(`./${req.params.name}.pug`, templateData);
  });

  app.get('/:category/:name', (req, res) => {
    res.render(`./${req.params.category}/${req.params.name}/index.pug`, templateData);
  });

  app.listen(8080);

  gulp.start('less:watch');
});
