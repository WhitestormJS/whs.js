'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HemisphereLight = undefined;

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

var HemisphereLight = function (_Light) {
  (0, _inherits3.default)(HemisphereLight, _Light);

  function HemisphereLight() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, HemisphereLight);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(HemisphereLight).call(this, params, 'hemispherelight'));

    _this.build(params);

    (0, _get3.default)(Object.getPrototypeOf(HemisphereLight.prototype), 'wrap', _this).call(_this);
    (0, _get3.default)(Object.getPrototypeOf(HemisphereLight.prototype), 'wrapShadow', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(HemisphereLight, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      return new Promise(function (resolve) {
        _scope.setNative(new THREE.HemisphereLight(params.light.skyColor, params.light.groundColor, params.light.intensity));

        if (params.helper) {
          _scope.helper = new THREE.HemisphereLightHelper(_scope.light, params.helper.size ? params.helper.size : 0);
        }

        resolve();
      });
    }
  }]);
  return HemisphereLight;
}(_Light2.Light);

exports.HemisphereLight = HemisphereLight;
//# sourceMappingURL=HemisphereLight.js.map
