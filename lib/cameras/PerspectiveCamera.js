'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerspectiveCamera = undefined;

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

var THREE = _interopRequireWildcard(_three);

var _Camera2 = require('../core/Camera');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PerspectiveCamera = function (_Camera) {
  (0, _inherits3.default)(PerspectiveCamera, _Camera);

  function PerspectiveCamera() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, PerspectiveCamera);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(PerspectiveCamera).call(this, params, 'perspectivecamera'));

    _this.build(params);
    (0, _get3.default)(Object.getPrototypeOf(PerspectiveCamera.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(PerspectiveCamera, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new Promise(function (resolve) {
        _this2.setNative(new THREE.PerspectiveCamera(params.camera.fov, params.camera.aspect, params.camera.near, params.camera.far));

        resolve();
      });
    }
  }]);
  return PerspectiveCamera;
}(_Camera2.Camera);

exports.PerspectiveCamera = PerspectiveCamera;
//# sourceMappingURL=PerspectiveCamera.js.map
