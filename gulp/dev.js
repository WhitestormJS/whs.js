import path from 'path';
import gulp from 'gulp';
import express from 'express';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import {argv} from 'yargs';
import DashboardPlugin from 'webpack-dashboard/plugin';

import {FrameworkCompilerInstance, ExampleCompilerInstance} from './compilers';
import {getPaths} from './utils';
import {getTemplateData, examples} from './config';

// DEV MODE
gulp.task('dev', () => {
  const app = express();
  const compilerInstance = new FrameworkCompilerInstance();
  const templateData = getTemplateData({devPhysics: argv.devPhysics, devMode: true});
  const exampleCompiler = new ExampleCompilerInstance({
    path: {
      ammojs: templateData.ammojs,
      assets: templateData.assets
    }
  });

  const compiler = compilerInstance('main');
  compiler.apply(new DashboardPlugin());

  app.use(new WebpackDevMiddleware(compiler, {
    contentBase: examples,
    publicPath: '/build/',

    stats: {colors: true}
  }));

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

  app.set('views', path.resolve(__dirname, `./${examples}`));
  app.set('view engine', 'pug');
  app.set('view cache', false);

  app.get('/', (req, res) => {
    res.render(`./index.pug`, templateData);
  });

  app.get('/:name', (req, res) => {
    res.render(`./${req.params.name}.pug`, templateData);
  });

  app.get('/:category/:name', (req, res) => {
    res.render(`./${req.params.category}/${req.params.name}/index.pug`, templateData);
  });

  app.listen(8080, 'localhost', () => {});
});
