import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'umd',
  dest: 'build/whs.js', // equivalent to --output
  moduleName: 'WHS',
  external: [
    'three'
  ],
  globals: {
    three: 'THREE'
  },
  plugins: [
    resolve({jsnext: true, main: true}),
    commonjs({include: 'node_modules/**'}),
    babel({
      exclude: [
        'node_modules/**',
        '*.json'
      ], // only transpile our source code
      // runtimeHelpers: true
    }),
    json({
      preferConst: true
    })
  ]
};
