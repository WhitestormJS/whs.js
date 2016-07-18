'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CubeCamera = require('./CubeCamera');

Object.keys(_CubeCamera).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _CubeCamera[key];
    }
  });
});

var _OrtographicCamera = require('./OrtographicCamera');

Object.keys(_OrtographicCamera).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _OrtographicCamera[key];
    }
  });
});

var _PerspectiveCamera = require('./PerspectiveCamera');

Object.keys(_PerspectiveCamera).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PerspectiveCamera[key];
    }
  });
});