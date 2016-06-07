'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AmbientLight = require('./AmbientLight');

_Object$keys(_AmbientLight).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AmbientLight[key];
    }
  });
});

var _DirectionalLight = require('./DirectionalLight');

_Object$keys(_DirectionalLight).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _DirectionalLight[key];
    }
  });
});

var _HemisphereLight = require('./HemisphereLight');

_Object$keys(_HemisphereLight).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HemisphereLight[key];
    }
  });
});

var _NormalLight = require('./NormalLight');

_Object$keys(_NormalLight).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _NormalLight[key];
    }
  });
});

var _PointLight = require('./PointLight');

_Object$keys(_PointLight).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PointLight[key];
    }
  });
});

var _SpotLight = require('./SpotLight');

_Object$keys(_SpotLight).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _SpotLight[key];
    }
  });
});
//# sourceMappingURL=index.js.map
