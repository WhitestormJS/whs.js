'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionalLight = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var THREE = _interopRequireWildcard(_three);

var _Light2 = require('../core/Light');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DirectionalLight = function (_Light) {
  (0, _inherits3.default)(DirectionalLight, _Light);

  function DirectionalLight() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, DirectionalLight);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(DirectionalLight).call(this, params, 'directionallight'));

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(DirectionalLight.prototype), 'wrap', _this).call(_this);
    (0, _get3.default)((0, _getPrototypeOf2.default)(DirectionalLight.prototype), 'wrapShadow', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(DirectionalLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      return new _promise2.default(function (resolve) {
        _scope.setNative(new THREE.DirectionalLight(params.light.color, params.light.intensity));

        if (params.helper) {
          _scope.helper = new THREE.DirectionalLightHelper(_scope.light, params.helper.size ? params.helper.size : 0);
        }

        resolve();
      });
    }
  }]);
  return DirectionalLight;
}(_Light2.Light);

exports.DirectionalLight = DirectionalLight;
//# sourceMappingURL=DirectionalLight.js.map
