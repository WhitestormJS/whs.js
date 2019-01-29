import path from 'path';
import glob from 'glob';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// console.log(glob.sync('./src/**/*.{js,pug}'));
const pugFiles = glob.sync('./src/**/*.pug');

const htmlPlugins = pugFiles.map(pugFile => new HtmlWebpackPlugin({
  filename: pugFile.replace('src/', '').replace('pug', 'html'),
  template: pugFile,
  inject: false
}));

export default {
  entry: glob.sync('./src/**/*.js').reduce((entries, name) => ({
    ...entries,
    [name.replace('src/', '')]: name
  }), {}),

  module: {
    rules: [
      {
        test: /.pug$/,
        use: 'pug-loader'
      }
    ]
  },

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './build/')
  },

  plugins: [
    ...htmlPlugins
  ]
};
