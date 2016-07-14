'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Camera = require('./Camera');

Object.keys(_Camera).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Camera[key];
    }
  });
});

var _Light = require('./Light');

Object.keys(_Light).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Light[key];
    }
  });
});

var _Object = require('./Object');

Object.keys(_Object).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Object[key];
    }
  });
});

var _Shape = require('./Shape');

Object.keys(_Shape).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Shape[key];
    }
  });
});

var _World = require('./World');

Object.keys(_World).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _World[key];
    }
  });
});
//# sourceMappingURL=index.js.map
