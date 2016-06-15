'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Fog = require('./Fog');

Object.keys(_Fog).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Fog[key];
    }
  });
});

var _FogExp = require('./FogExp2');

Object.keys(_FogExp).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FogExp[key];
    }
  });
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
