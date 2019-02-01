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

const outputConfig = {
  sourcemap: true,
  globals: {
    three: 'THREE'
  },
  banner: `/* WhitestormJS Framework v${require('./package.json').version} */`
}

export default {
  input: 'src/index.js',

  external: ['three'],

  globals: {
    three: 'THREE'
  },

  output: [{
    ...outputConfig,
    format: 'umd',
    name: 'WHS.core',
    file: 'build/whs.core.js',
  }, {
    ...outputConfig,
    format: 'es',
    file: 'build/whs.core.module.js',
  }],

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
