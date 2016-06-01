'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

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

    this.fog = new _three2.default.Fog(params.hex, params.near, params.far);
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

exports.default = Fog;
//# sourceMappingURL=Fog.js.map
