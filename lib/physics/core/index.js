'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mesh = require('./mesh');

Object.keys(_mesh).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _mesh[key];
    }
  });
});

var _scene = require('./scene');

Object.keys(_scene).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scene[key];
    }
  });
});