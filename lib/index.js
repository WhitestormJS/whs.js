'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./cameras/index');

_Object$keys(_index).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _index2 = require('./core/index');

_Object$keys(_index2).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});

var _index3 = require('./extensions/index');

_Object$keys(_index3).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index3[key];
    }
  });
});

var _index4 = require('./extras/index');

_Object$keys(_index4).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index4[key];
    }
  });
});

var _index5 = require('./lights/index');

_Object$keys(_index5).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index5[key];
    }
  });
});

var _index6 = require('./meshes/index');

_Object$keys(_index6).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index6[key];
    }
  });
});

var _index7 = require('./scenes/index');

_Object$keys(_index7).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index7[key];
    }
  });
});

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _physi = require('./physics/physi.js');

var Physijs = _interopRequireWildcard(_physi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

if (window) {
  window.THREE = THREE;
  window.Physijs = Physijs;
}
//# sourceMappingURL=index.js.map
