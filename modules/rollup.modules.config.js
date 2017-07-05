import fs from 'fs';
import path from 'path';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const configure = (moduleName = 'file') => ({
  entry: `src/${moduleName}.js`,
  format: 'umd',
  moduleName,
  banner: `/* Built for whs v${require('./package.json').version} */`,
  // sourceMap: true,

  external: [
    'three',
    'whs'
  ],

  globals: {
    three: 'THREE',
    whs: 'WHS'
  },

  plugins: [
    resolve({jsnext: true, main: true}),
    commonjs({include: 'node_modules/**'}),
    babel({
      exclude: [
        'node_modules/**'
      ]
    }),
  ],

  targets: [
    {
      dest: `${moduleName}.js`
    },
    {
      format: 'es',
      dest: `${moduleName}.module.js`
    }
  ]
});

function buildConfiguration() {
  const config = [];

  const exclude = (file) => !(file === 'package.json' || file === 'package-lock.json');

  fs.readdirSync('./src/').forEach(file => {
    if (file.indexOf('.js') > 0 && exclude(file)) {
      config.push(configure(file.replace('.js', '')));
    }
  });

  return config;
}

export default buildConfiguration();
