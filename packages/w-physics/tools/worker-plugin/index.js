import fs from 'fs';
import path from 'path';
import rollup from 'rollup';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {transformSync} from '@babel/core';

const paths = new Map();

export default function () {
  return {
    resolveId(importee, importer) {
      if (importee === '__tools/worker-plugin__') {
        return path.resolve(__dirname, './tools/worker-plugin/workerhelper.js');
      } else if (importee.indexOf('worker!') === 0) {
        var name = importee.split('!')[1],
          target = path.resolve(path.dirname(importer), name);

        paths.set(target, name);
        return target;
      }
    },

    /**
     * Do everything in load so that code loaded by the plugin can still be transformed by the
     * rollup configuration
     */
    load: function (id) {
      console.log(id);
      if (!paths.has(id)) return;

      return rollup.rollup({
        input: id,
        plugins: [
          resolve({
            jsnext: true,
            module: true
          }),
          babel({
            runtimeHelpers: true,
            sourceMap: true
          }),
          commonjs({include: 'node_modules/**', ignoreGlobal: true})
        ]
      }).then(result => {
        return result.generate({ format: 'es' }).then(({output: [{code, map}]}) => {
          return {
            code: [
              `import shimWorker from '__tools/worker-plugin__';`,
              `export default new shimWorker(${JSON.stringify(paths.get(id))}, function (window, document) {`,
                `var self = this;`,
                code,
                `\n});`
              ].join('\n'),
            map
          };
        });
      });
    }
  };
}
