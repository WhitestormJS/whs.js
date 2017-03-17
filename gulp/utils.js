import fs from 'fs';
import path from 'path';
import {argv} from 'yargs';

// ENVIRONMENT  SETUP
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

export const getPaths = () => {
  const categories = [];
  const paths = [];
  const excludeFolders = ['assets'];

  const handleFolders = (folder, callback) =>
    fs.readdirSync(folder).filter(file => {
      if (excludeFolders.includes(file)) return false;
      if (fs.statSync(path.join(folder, file)).isDirectory()) callback(file);

      return true;
    });

  handleFolders('./examples/', category => {
    categories.push(category);

    handleFolders(path.join('./examples/', category), name => {
      paths.push(`${category}/${name}`);
    });
  });

  return [paths, categories];
};

// ERRORS
export const makeBuildErrorHandler = () => {
  return function ({name, message, codeFrame}) {
    log('magenta', `${name} ${message}${codeFrame ? `\n${codeFrame}` : ''}`);

    this.emit('end');
  };
};
