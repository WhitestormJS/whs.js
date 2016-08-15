'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _firstPersonControls = require('./controls/firstPersonControls');

Object.keys(_firstPersonControls).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _firstPersonControls[key];
    }
  });
});

var _orbitControls = require('./controls/orbitControls');

Object.keys(_orbitControls).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _orbitControls[key];
    }
  });
});

var _api = require('./api');

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _api[key];
    }
  });
});

var _Line = require('./Line');

Object.keys(_Line).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Line[key];
    }
  });
});

var _Points = require('./Points');

Object.keys(_Points).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Points[key];
    }
  });
});

var _Group = require('./Group');

Object.keys(_Group).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Group[key];
    }
  });
});

var _Skybox = require('./Skybox');

Object.keys(_Skybox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Skybox[key];
    }
  });
});
//# sourceMappingURL=index.js.map
