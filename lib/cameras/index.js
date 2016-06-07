'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CubeCamera = require('./CubeCamera');

_Object$keys(_CubeCamera).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CubeCamera[key];
    }
  });
});

var _OrtographicCamera = require('./OrtographicCamera');

_Object$keys(_OrtographicCamera).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OrtographicCamera[key];
    }
  });
});

var _PerspectiveCamera = require('./PerspectiveCamera');

_Object$keys(_PerspectiveCamera).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PerspectiveCamera[key];
    }
  });
});
//# sourceMappingURL=index.js.map
