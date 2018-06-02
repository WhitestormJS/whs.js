import fs from 'fs';
import path from 'path';
import {argv} from 'yargs';

// ENVIRONMENT  SETUP'
export const isProduction = argv.prod ? true : process.env.NODE_ENV === 'production';
process.env.BABEL_ENV = argv.prod ? 'production' : process.env.NODE_ENV;

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
  white: '\x1b[37m'
};

export const log = (color, msg) => console.log(consoleColors[color], msg, consoleColors.reset);

const isExample = _path =>
  fs.statSync(_path).isDirectory() && fs.existsSync(path.join(_path, './index.pug'));

export const parseExamplesStructure = () => {
  const categories = [];
  const map = {};
  const paths = [];
  const excludeFolders = ['assets', 'build', 'modules'];

  const handleFolders = (folder, callback) =>
    fs.readdirSync(folder).filter(file => {
      if (excludeFolders.includes(file)) return false;
      if (fs.statSync(path.join(folder, file)).isDirectory()) callback(file);

      return true;
    });

  handleFolders('./examples/', category => {
    categories.push(category);

    const _path = path.join('./examples/', category);
    const _map = {};

    map[category] = _map;

    handleFolders(_path, fileOrSubcategory => {
      const __path = path.join(_path, fileOrSubcategory);

      if (isExample(__path)) {
        paths.push(`${category}/${fileOrSubcategory}`);
        // console.log(fileOrSubcategory);
        _map[fileOrSubcategory] = {};
      } else {
        const __map = {};
        _map[fileOrSubcategory] = __map;

        handleFolders(__path, file => {
          paths.push(`${category}/${fileOrSubcategory}/${file}`);
          __map[file] = {};
        });
      }
    });
  });

  return {paths, categories, map};
};

// ERRORS
export const makeBuildErrorHandler = () => {
  return function ({name, message, codeFrame}) {
    log('magenta', `${name} ${message}${codeFrame ? `\n${codeFrame}` : ''}`);

    this.emit('end');
  };
};
