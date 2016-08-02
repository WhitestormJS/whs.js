'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./cameras/index');

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _index2 = require('./core/index');

Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});

var _index3 = require('./extensions/index');

Object.keys(_index3).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index3[key];
    }
  });
});

var _index4 = require('./extras/index');

Object.keys(_index4).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index4[key];
    }
  });
});

var _index5 = require('./lights/index');

Object.keys(_index5).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index5[key];
    }
  });
});

var _index6 = require('./meshes/index');

Object.keys(_index6).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index6[key];
    }
  });
});

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _index7 = require('./physics/index.js');

var Physijs = _interopRequireWildcard(_index7);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

if (typeof window !== 'undefined') {
  window.THREE = THREE;
  window.Physijs = Physijs;
} else if (typeof global !== 'undefined') {
  global.THREE = THREE;
  global.Physijs = Physijs;
}
//# sourceMappingURL=index.js.map
