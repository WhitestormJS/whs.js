import path from 'path';
import glob from 'glob';

export default {
  entry: glob.sync('./src/**/.{js,pug}'),

  output: {
    // filename:
    path: path.resolve(__dirname, './build/')
  }
};
