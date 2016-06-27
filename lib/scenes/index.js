'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Group = require('./Group');

Object.keys(_Group).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Group[key];
    }
  });
});

var _Skybox = require('./Skybox');

Object.keys(_Skybox).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Skybox[key];
    }
  });
});
//# sourceMappingURL=index.js.map
