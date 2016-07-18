'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Loop = require('./Loop');

Object.keys(_Loop).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Loop[key];
    }
  });
});