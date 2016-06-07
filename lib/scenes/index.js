'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Fog = require('./Fog');

_Object$keys(_Fog).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Fog[key];
    }
  });
});

var _FogExp = require('./FogExp2');

_Object$keys(_FogExp).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FogExp[key];
    }
  });
});

var _Group = require('./Group');

_Object$keys(_Group).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Group[key];
    }
  });
});

var _Skybox = require('./Skybox');

_Object$keys(_Skybox).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Skybox[key];
    }
  });
});
//# sourceMappingURL=index.js.map
