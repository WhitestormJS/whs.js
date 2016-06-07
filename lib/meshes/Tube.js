'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tube = undefined;

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

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tube = function (_Shape) {
  (0, _inherits3.default)(Tube, _Shape);

  function Tube() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Tube);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tube).call(this, params, 'tube'));

    (0, _api.extend)(params.geometry, {

      path: options.geometryOptions.path ? new _this.CustomSinCurve(100) : false,
      segments: 20,
      radius: 2,
      radiusSegments: 8,
      closed: false

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Tube.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Tube, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Tube.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new THREE.TubeGeometry(params.geometry.path, params.geometry.segments, params.geometry.radius, params.geometry.radiusSegments, params.geometry.closed), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',


    /**
     * Clone tube.
     */
    value: function clone() {
      return new Tube(this.getParams(), this._type).copy(this);
    }
  }, {
    key: 'CustomSinCurve',
    get: function get() {
      var _this2 = this;

      return THREE.Curve.create(function (scale) {
        // custom curve constructor
        _this2.scale = scale || 1;
      }, function (t) {
        // getPoint: t is between 0-1
        var tx = t * 3 - 1.5,
            ty = Math.sin(2 * Math.PI * t),
            tz = 0;

        return new THREE.Vector3(tx, ty, tz).multiplyScalar(_this2.scale);
      });
    }
  }]);
  return Tube;
}(_Shape2.Shape);

exports.Tube = Tube;
//# sourceMappingURL=Tube.js.map
