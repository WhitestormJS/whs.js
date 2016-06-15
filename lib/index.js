'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./cameras/index');

Object.keys(_index).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});

var _index2 = require('./core/index');

Object.keys(_index2).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});

var _index3 = require('./extensions/index');

Object.keys(_index3).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index3[key];
    }
  });
});

var _index4 = require('./extras/index');

Object.keys(_index4).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index4[key];
    }
  });
});

var _index5 = require('./lights/index');

Object.keys(_index5).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index5[key];
    }
  });
});

var _index6 = require('./meshes/index');

Object.keys(_index6).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index6[key];
    }
  });
});

var _index7 = require('./scenes/index');

Object.keys(_index7).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index7[key];
    }
  });
});

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _physi = require('./physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined') {
  window.THREE = _three2.default;
  window.Physijs = _physi2.default;
} else if (typeof global !== 'undefined') {
  global.THREE = _three2.default;
  global.Physijs = _physi2.default;
}
//# sourceMappingURL=index.js.map
