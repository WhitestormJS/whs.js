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
  entry: 'src/index.js',
  format: 'umd',
  // dest: `build/whs.js`, // equivalent to --output
  moduleName: 'WHS',
  banner: `/* WhitestormJS Framework v${require('./package.json').version} */`,
  sourceMap: true,

  external: [
    'three'
  ],

  globals: {
    three: 'THREE'
  },

  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    babelFix(
      babel()
    ),
    commonjs({include: 'node_modules/**'}),
    json({
      preferConst: true
    }),
    replace({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
  ],

  targets: [
    {
      dest: 'build/whs.js'
    },
    {
      format: 'es',
      dest: 'build/whs.module.js'
    }
  ]
};
