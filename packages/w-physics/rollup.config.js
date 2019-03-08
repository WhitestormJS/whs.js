import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import bundleWorker from './tools/worker-plugin/index';

const outputConfig = {
  sourcemap: true,
  globals: {
    three: 'THREE'
  },
  banner: `/* WhitestormJS Physics v${require('./package.json').version} */`
}

export default {
  input: 'src/index.ammo.js',

  external: ['three'],

  globals: {
    three: 'THREE'
  },

  output: [{
    ...outputConfig,
    format: 'umd',
    name: 'WHS.physics.ammo',
    file: 'build/whs.physics.ammo.js',
  }, {
    ...outputConfig,
    format: 'es',
    file: 'build/whs.physics.ammo.module.js',
  }],

  plugins: [
    bundleWorker(),
    resolve({
      jsnext: true,
      module: true
    }),
    babel({
      exclude: [
        'node_modules/**',
        'src/engines/worker.js'
      ],
      runtimeHelpers: true,
      sourceMap: true
    }),
    commonjs({include: 'node_modules/**', ignoreGlobal: true}),
    json({
      preferConst: true
    }),
    replace({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
  ]
};
