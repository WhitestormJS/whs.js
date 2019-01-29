import fs from 'fs';
import path from 'path';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const configure = (moduleName = 'file') => ({
  input: `${moduleName}.js`,

  output: [{
    format: 'umd',
    name: moduleName,
    sourcemap: true,
    file: path.resolve(__dirname, `../../../modules/${moduleName}.js`),
    external: ['three', 'whs'],
    banner: `/* Built for whs v${require('../../../package.json').version} */`
  }, {
    format: 'es',
    sourcemap: true,
    file: path.resolve(__dirname, `../../../modules/${moduleName}.module.js`),
    external: ['three', 'whs'],
    banner: `/* Built for whs v${require('../../../package.json').version} */`
  }],

  globals: {
    three: 'THREE',
    whs: 'WHS'
  },

  plugins: [
    resolve({
      jsnext: true,
      module: true
    }),
    commonjs({include: 'node_modules/**'}),
    babel({
      exclude: [
        'node_modules/**',
        '*.json'
      ],
      // ...require('./.babelrc.js'),
      // runtimeHelpers: true,
      sourceMap: true
    }),
  ]
});

function buildConfiguration() {
  const config = [];

  const exclude = (file) =>
    /(\.json$|\.config\.js$|\.babel\.?rc)/.test(file);

  fs.readdirSync('./').forEach(file => {
    if (file.indexOf('.js') > 0 && !exclude(file)) {
      config.push(configure(file.replace('.js', '')));
    }
  });

  return config;
}

export default buildConfiguration();
