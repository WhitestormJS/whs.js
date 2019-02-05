import fs from 'fs';
import path from 'path';
import rollup from 'rollup';
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
      if (!paths.has(id)) return;

      return rollup.rollup({
        input: id
      }).then(result => {
        return result.generate({ format: 'es' }).then(({output: [{code}]}) => {
          return [
            `import shimWorker from '__tools/worker-plugin__';`,
            `export default new shimWorker(${JSON.stringify(paths.get(id))}, function (window, document) {`,
              `var self = this;`,
              transformSync(code, {
                presets: [['@babel/preset-env', {
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7']
                  }
                }]]
              }).code,
              `\n});`
            ].join('\n');
          });
        });
    }
  };
}
