'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Camera = require('./Camera');

_Object$keys(_Camera).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Camera[key];
    }
  });
});

var _Curve = require('./Curve');

_Object$keys(_Curve).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Curve[key];
    }
  });
});

var _Light = require('./Light');

_Object$keys(_Light).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Light[key];
    }
  });
});

var _Object = require('./Object');

_Object$keys(_Object).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Object[key];
    }
  });
});

var _Shape = require('./Shape');

_Object$keys(_Shape).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Shape[key];
    }
  });
});

var _World = require('./World');

_Object$keys(_World).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _World[key];
    }
  });
});
//# sourceMappingURL=index.js.map
