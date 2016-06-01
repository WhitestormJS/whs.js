'use strict';

import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrbitControl = exports.FPSControl = undefined;

var _api = require('./api');

_Object$keys(_api).forEach(function (key) {
  if (key === "default") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _api[key];
    }
  });
});

var _FPSControl2 = require('./controls/FPSControl');

var _FPSControl3 = _interopRequireDefault(_FPSControl2);

var _OrbitControl2 = require('./controls/OrbitControl');

var _OrbitControl3 = _interopRequireDefault(_OrbitControl2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.FPSControl = _FPSControl3.default;
exports.OrbitControl = _OrbitControl3.default;
//# sourceMappingURL=index.js.map
