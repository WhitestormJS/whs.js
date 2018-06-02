import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

// Temporary fix.
const babelFix = babelPlugin => {
  const oldTransform = babelPlugin.transform;

  babelPlugin.transform = (code, id) => {
    if (!(/node_modules\/(?!postprocessing)/.test(id) || /\.json/.test(id))) {
      // Fake path to avoid throwing error.
      if (id.indexOf('node_modules') > 0) id = path.resolve(__dirname, './src/file.js');
      return oldTransform(code, id);
    }

    return null;
  };

  return babelPlugin;
};

export default {
  input: 'src/index.js',

  output: [{
    format: 'umd',
    name: 'WHS',
    sourcemap: true,
    file: 'build/whs.js',
    external: ['three'],
    banner: `/* WhitestormJS Framework v${require('./package.json').version} */`
  }, {
    format: 'es',
    sourcemap: true,
    file: 'build/whs.module.js',
    external: ['three'],
    banner: `/* WhitestormJS Framework v${require('./package.json').version} */`
  }],

  globals: {
    three: 'THREE'
  },

  plugins: [
    resolve({
      jsnext: true,
      module: true
    }),
    babelFix(
      babel({
        runtimeHelpers: true,
        sourceMap: true
      })
    ),
    commonjs({include: 'node_modules/**', ignoreGlobal: true}),
    json({
      preferConst: true
    }),
    replace({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
  ]
};
