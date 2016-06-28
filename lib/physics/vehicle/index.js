'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tunning = require('./tunning');

Object.keys(_tunning).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tunning[key];
    }
  });
});

var _vehicle = require('./vehicle');

Object.keys(_vehicle).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _vehicle[key];
    }
  });
});
//# sourceMappingURL=index.js.map
