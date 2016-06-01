'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cameras = require('./cameras');

_Object$keys(_cameras).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cameras[key];
    }
  });
});

var _core = require('./core');

_Object$keys(_core).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _core[key];
    }
  });
});

var _extensions = require('./extensions');

_Object$keys(_extensions).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _extensions[key];
    }
  });
});

var _extras = require('./extras');

_Object$keys(_extras).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _extras[key];
    }
  });
});

var _lights = require('./lights');

_Object$keys(_lights).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lights[key];
    }
  });
});

var _meshes = require('./meshes');

_Object$keys(_meshes).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _meshes[key];
    }
  });
});

var _scenes = require('./scenes');

_Object$keys(_scenes).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scenes[key];
    }
  });
});
//# sourceMappingURL=index.js.map
