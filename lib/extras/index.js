'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firstPersonControls = require('./controls/firstPersonControls');

_Object$keys(_firstPersonControls).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _firstPersonControls[key];
    }
  });
});

var _orbitControls = require('./controls/orbitControls');

_Object$keys(_orbitControls).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _orbitControls[key];
    }
  });
});

var _api = require('./api');

_Object$keys(_api).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _api[key];
    }
  });
});
//# sourceMappingURL=index.js.map
