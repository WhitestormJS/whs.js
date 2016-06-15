'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AmbientLight = require('./AmbientLight');

Object.keys(_AmbientLight).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AmbientLight[key];
    }
  });
});

var _DirectionalLight = require('./DirectionalLight');

Object.keys(_DirectionalLight).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DirectionalLight[key];
    }
  });
});

var _HemisphereLight = require('./HemisphereLight');

Object.keys(_HemisphereLight).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HemisphereLight[key];
    }
  });
});

var _NormalLight = require('./NormalLight');

Object.keys(_NormalLight).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NormalLight[key];
    }
  });
});

var _PointLight = require('./PointLight');

Object.keys(_PointLight).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PointLight[key];
    }
  });
});

var _SpotLight = require('./SpotLight');

Object.keys(_SpotLight).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SpotLight[key];
    }
  });
});
//# sourceMappingURL=index.js.map
