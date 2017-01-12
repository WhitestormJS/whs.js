// UTILS
import path from 'path';
import del from 'del';
import {argv} from 'yargs';
import express from 'express';
import serveIndex from 'serve-index';
import fs from 'fs';

// GULP
import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';

// WEBPACK & KARMA
import karma from 'karma';
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';

import {config} from './webpack.config.babel.js';
import wConfig from './test/webpack/webpack.config.js';
if (argv.devPhysics) console.log(`DevPhysics is running on: ${argv.devPhysics} port`);

// SETTINGS
const
  frameworkSrc = './src',
  frameworkDest = './build',

  examplesDev = './src/examples',
  examplesSrc = `${examplesDev}/**/*`,
  examplesDest = './examples',

  templateData = {
    assets: '../../assets',
    physicsModule: argv.devPhysics ?
      `http://localhost:${argv.devPhysics}/physics-module.js`
      : '../../../vendor/physics-module.js',
    ammojs: argv.devPhysics ?
      `http://localhost:${argv.devPhysics}/vendor/ammo.js`
      : '../../../vendor/ammo.js'
  };

const $ = loadPlugins({
  rename: {
    'gulp-browser-basedir': 'gbrowser'
  }
});

// COMPILERS
const isProduction = argv.prod ? true : process.env.NODE_ENV === 'production';

const compilers = {
  'main': webpack(config({
    isProduction,
    frameworkSrc,
    frameworkDest
  })),
  'compact': webpack((() => {
    const configuration = config({
      isProduction,
      frameworkSrc,
      frameworkDest
    });

    configuration.plugins.push(new webpack.IgnorePlugin(/(components)/));
    configuration.output.filename = 'whitestorm.compact.js';

    return configuration;
  })())
};

const consoleColors = {
  reset: '\x1b[0m',
  hicolor: '\x1b[1m',
  underline: '\x1b[4m',
  inverse: '\x1b[7m',

  // foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
}

const log = (color, msg) => console.log(consoleColors[color], msg, consoleColors.reset);

const wCompiler = webpack(wConfig); // Webpack test.

// ENVIRONMENT  SETUP
process.env.BABEL_ENV = 'node';

// ALIAS
gulp.task('default', ['build']);
gulp.task('build', ['src:build', 'examples:build']);

// BUILD
gulp.task('src:build', ['build:clean'], (callback) => {
  log('cyan', 'WEBPACK BUILD [\'main\' compiler status]: Started.');

  compilers['main'].run((error, stats) => {
    if (error) throw new $.util.PluginError('webpack', error);
    $.util.log('[webpack]', stats.toString({colors: true}));

    log('green', 'WEBPACK BUILD [\'main\' compiler status]: Finished.');
  });

  log('cyan', 'WEBPACK BUILD [\'compact\' compiler status]: Started.');

  compilers['compact'].run((error, stats) => {
    if (error) throw new $.util.PluginError('webpack', error);
    $.util.log('[webpack]', stats.toString({colors: true}));

    log('cyan', 'WEBPACK BUILD [\'compact\' compiler status]: Finished.');
  });
});

// DEV MODE
gulp.task('dev', () => {
  const app = express();

  app.use(new WebpackDevMiddleware(compilers['main'], {
    contentBase: examplesDest,
    publicPath: '/build/',

    stats: {colors: true}
  }));

  const getPaths = () => {
    const categories = [];
    const paths = [];
    const excludeFolders = ['_assets'];

    const handleFolders = (folder, callback) => {
      fs.readdirSync(folder).filter(file => {
        if (excludeFolders.includes(file)) return;
        if (fs.statSync(path.join(folder, file)).isDirectory()) callback(file);
      });
    }

    handleFolders('./examples/', category => {
      categories.push(category);

      handleFolders(path.join('./examples/', category), name => {
        paths.push(`${category}/${name}`);
      });
    });

    return [paths, categories];
  }

  const configExtend = {
    output: {
      path: '/',
      filename: 'script.js'
    },
    module: {
      loaders: [{
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            // ['transform-runtime', {polyfill: false}],
            'transform-object-rest-spread'
          ],
          presets: [['es2015', {modules: false}]]
        }
      }]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.ammoPath': `'${templateData.ammojs}'`,
        'process.assetsPath': `'${templateData.assets}'`
      })
    ],
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false
    }
  };

  const exampleCompiler = (path) => webpack({
    entry: `./examples/${path}/script.js`,
    output: configExtend.output,
    module: configExtend.module,
    plugins: configExtend.plugins
  });

  const paths = getPaths();
  templateData.paths = paths[0];
  templateData.categories = paths[1];

  paths[0].forEach((path) => {
    app.use(new WebpackDevMiddleware(
      exampleCompiler(path),
      {
        contentBase: examplesDest,
        publicPath: `/${path}`,
        noInfo: true,
        stats: configExtend.stats
      }
    ));
  });

  app.use('/assets', express.static(path.resolve(__dirname, `${examplesDest}/_assets`)));

  app.get('/vendor/physics-module.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './vendor/physics-module.js'));
  });

  app.set('views', path.resolve(__dirname, `./${examplesDest}`));
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

// DEV MODE
gulp.task('webpack-dev', () => {
  const server = new WebpackDevMiddleware(wCompiler, {
    contentBase: './test/webpack/',
    publicPath: '/build/',

    stats: {colors: true}
  });

  server.listen(8001, 'localhost', () => {});
});

// EXAMPLES: BUILD
// gulp.task('examples:build', ['examples:clean'], () => {
//   gulp.src([
//     `${examplesDev}/**/*`,
//     `!${examplesDev}/**/*.html`,
//     `!${examplesDev}/!(_libs)/*.js`,
//     `!${examplesDev}/**/script.js`,
//     `${examplesDev}/_assets/**/*.js`
//   ])
//     .pipe($.plumber())
//     .pipe(gulp.dest(examplesDest));

//   gulp.src([
//     `${examplesDev}/**/*.js`,
//     `!${examplesDev}/**/*.html`,
//     `!${examplesDev}/_assets/**/*.js`
//   ])
//     .pipe($.plumber())
//     .pipe($.swig(Object.assign({}, swigParameters, {ext: '.js'})))
//     .pipe($.gbrowser.browserify({basedir: path.resolve(examplesDev)}, {
//       transform: 'babelify',
//       options: {presets: ['es2015']}
//     }))
//     .pipe(gulp.dest(examplesDest));

//   gulp.src(`${examplesDev}/**/*.html`)
//     .pipe($.plumber())
//     .pipe($.swig(swigParameters))
//     .pipe(gulp.dest(examplesDest));
// });

// TESTING
gulp.task('test', ['test:benchmark', 'test:unit']);

gulp.task('test:benchmark', done => {
  new karma.Server({
    configFile: `${__dirname}/test/karma.benchmark.conf.js`
  }, () => {
    done();
  }).start();
});

gulp.task('test:unit', done => {
  new karma.Server({
    configFile: `${__dirname}/test/karma.unit.conf.js`
  }, () => {
    done();
  }).start();
});

// LINT
gulp.task('src:lint', () => {
  gulp.src(`${frameworkSrc}/**/*`)
    .pipe($.cached('lint', {optimizeMemory: true}))
    .pipe($.xo())
    .on('error', makeBuildErrorHandler('lint'));
});

// CLEANING
// gulp.task('examples:clean', (callback) => {
//   del(examplesDest).then(() => callback());
// });

gulp.task('build:clean', (callback) => {
  del([`${frameworkDest}/*.js`, `${frameworkDest}/*.map`, './lib/**/*.js', './lib/**/*.map']).then(() => callback());
});

// ERRORS
function makeBuildErrorHandler(taskName) {
  return function ({name, message, codeFrame}) {
    $.util.log(`[${taskName}]`, `${$.util.colors.red(name)} ${message}${codeFrame ? `\n${codeFrame}` : ''}`);
    this.emit('end');
  };
}
