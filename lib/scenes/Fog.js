'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fog = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fog = function () {
  function Fog() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Fog);

    WHS.API.extend(params, {
      hex: 0x000000,
      near: 1,
      far: 1000
    });

    this.fog = new THREE.Fog(params.hex, params.near, params.far);
    this.type = 'fog';
  }

  (0, _createClass3.default)(Fog, [{
    key: 'addTo',
    value: function addTo(root) {
      root.getScene().fog = this.fog;
    }
  }]);
  return Fog;
}();

exports.Fog = Fog;
//# sourceMappingURL=Fog.js.map
