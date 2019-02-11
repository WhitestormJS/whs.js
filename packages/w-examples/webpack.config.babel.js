import path from 'path';
import fs from 'fs';
import pug from 'pug';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import glob from 'glob';
import express from 'express';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {version} from './package.json';

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

const pugFiles = glob.sync('./src/**/*.pug');

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

const htmlPlugins = pugFiles.map(pugFile => new HtmlWebpackPlugin({
  filename: pugFile.replace('src/', '').replace('pug', 'html'),
  template: pugFile,
  inject: false,
  data: {
    // TODO: optimize
    version,
    map: glob.sync('./src/*/').reduce((all, categoryFolder) => {
      const category = /\/src\/(.*)\//.exec(categoryFolder)[1];

      return {
        ...all,
        [category]: glob.sync(`./src/${category}/*/`).reduce((all, exampleFolder) => ({
          ...all,
          [/\/src\/(.*)\/(.*)\//.exec(exampleFolder)[2]]: {}
        }), {})
      }
    }, {})
  }
}));

const filters = {
  explanation(text, options) {
    if (options.file) {
      const renderFile = options.filename.replace(/(\/[^/]*\.pug)$/, '/' + options.file);
      const content = fs.readFileSync(renderFile, 'utf8');
      text = content + '\n' + text;
    }

    const title = (/\[\/\/\]:\s#\s\((title:\s)(.*)\)/g.exec(text) || [])[2]; // eslint-disable-line
    const date = (/\[\/\/\]:\s#\s\((date:\s)(.*)\)/g.exec(text) || [])[2]; // eslint-disable-line

    return `
      ${pug.render(contentHeader(title, date))}
      ${md.render(text)}
    `;
  }
};

export default {
  mode: 'development',
  entry: glob.sync('./src/**/*.js').reduce((entries, name) => ({
    ...entries,
    [name.replace('src/', '')]: name
  }), {}),

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          filters
        }
      }
    ]
  },

  output: {
    filename: '[name]',
    path: path.resolve(__dirname, './public/')
  },

  plugins: [
    ...htmlPlugins
  ],

  externals: {
    'three': 'THREE',
    '@whs/core': 'WHS.core',
    '@whs/physics': 'WHS.physics.ammo'
  },

  devServer: {
    contentBase: '/public',
    before(app, server) {
      app.use('/assets', express.static(path.resolve(__dirname, './public/assets/')));
      app.use('/vendor', express.static(path.resolve(__dirname, './node_modules/@whs/core/build/')));
      app.use('/vendor', express.static(path.resolve(__dirname, '../w-physics/build/')));
    }
  },

  watchOptions: {
    ignored: /^node_modules\/((?!@whs).)*$/
  }
};
