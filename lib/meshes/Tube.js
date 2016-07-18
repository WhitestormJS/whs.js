'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tube = undefined;

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

var _index = require('../physics/index.js');

var _index2 = _interopRequireDefault(_index);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tube = function (_Shape) {
  (0, _inherits3.default)(Tube, _Shape);

  function Tube() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Tube);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Tube).call(this, params, 'tube'));

    (0, _api.extend)(params.geometry, {
      path: options.geometryOptions.path ? new _this.CustomSinCurve(100) : false,
      segments: 20,
      radius: 2,
      radiusSegments: 8,
      closed: false
    });

    if (params.build) {
      _this.build(params);
      (0, _get3.default)(Object.getPrototypeOf(Tube.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  (0, _createClass3.default)(Tube, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var material = (0, _get3.default)(Object.getPrototypeOf(Tube.prototype), '_initMaterial', this).call(this, params.material);

      var Mesh = void 0;

      if (this.physics && this.getParams().softbody) Mesh = _index2.default.SoftMesh;else if (this.physics && this.physics.type === 'concave') Mesh = _index2.default.ConcaveMesh;else if (this.physics) Mesh = _index2.default.ConvexMesh;else Mesh = THREE.Mesh;

      return new Promise(function (resolve) {
        _this2.setNative(new Mesh(_this2.buildGeometry(params), material, _this2.getParams()));

        resolve();
      });
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var GConstruct = params.buffer && !params.softbody ? THREE.TubeBufferGeometry : THREE.TubeGeometry;

      return new GConstruct(params.geometry.path, params.geometry.segments, params.geometry.radius, params.geometry.radiusSegments, params.geometry.closed);
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Tube({ build: false }).copy(this);
    }
  }, {
    key: 'CustomSinCurve',
    get: function get() {
      var _this3 = this;

      return THREE.Curve.create(function (scale) {
        // custom curve constructor
        _this3.scale = scale || 1;
      }, function (t) {
        // getPoint: t is between 0-1
        var tx = t * 3 - 1.5,
            ty = Math.sin(2 * Math.PI * t),
            tz = 0;

        return new THREE.Vector3(tx, ty, tz).multiplyScalar(_this3.scale);
      });
    }
  }, {
    key: 'G_path',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { path: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.path;
    }
  }, {
    key: 'G_segments',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { segments: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.segments;
    }
  }, {
    key: 'G_radius',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { radius: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.radius;
    }
  }, {
    key: 'G_radiusSegments',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { radiusSegments: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.radiusSegments;
    }
  }, {
    key: 'G_closed',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { closed: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.closed;
    }
  }]);
  return Tube;
}(_Shape2.Shape);

exports.Tube = Tube;