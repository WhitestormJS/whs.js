'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _Camera2 = require('../core/Camera');

var _Camera3 = _interopRequireDefault(_Camera2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CubeCamera = function (_Camera) {
  (0, _inherits3.default)(CubeCamera, _Camera);

  function CubeCamera() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, CubeCamera);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CubeCamera).call(this, params, 'cubecamera'));

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(CubeCamera.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(CubeCamera, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new Promse(function (resolve) {
        _this2.setNative(new _three2.default.CubeCamera(params.camera.near, params.camera.far, params.camera.cubeResolution));

        resolve();
      });
    }
  }]);
  return CubeCamera;
}(_Camera3.default);

exports.default = CubeCamera;
//# sourceMappingURL=CubeCamera.js.map
