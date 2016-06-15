'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ring = undefined;

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

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ring = function (_Shape) {
  (0, _inherits3.default)(Ring, _Shape);

  function Ring() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Ring);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Ring).call(this, params, 'ring'));

    (0, _api.extend)(params.geometry, {
      innerRadius: 0,
      outerRadius: 50,
      thetaSegments: 8,
      phiSegments: 8,
      thetaStart: 0,
      thetaLength: Math.PI * 2
    });

    if (params.build) {
      _this.build(params);
      (0, _get3.default)(Object.getPrototypeOf(Ring.prototype), 'wrap', _this).call(_this, 'onlyvis');
    }
    return _this;
  }

  (0, _createClass3.default)(Ring, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          material = (0, _get3.default)(Object.getPrototypeOf(Ring.prototype), '_initMaterial', this).call(this, params.material);

      return new Promise(function (resolve) {
        _scope.setNative(new THREE.Mesh(new THREE.RingGeometry(params.geometry.innerRadius, params.geometry.outerRadius, params.geometry.thetaSegments, params.geometry.phiSegments, params.geometry.thetaStart, params.geometry.thetaLength), material));

        resolve();
      });
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new THREE.RingGeometry(params.geometry.innerRadius, params.geometry.outerRadius, params.geometry.thetaSegments, params.geometry.phiSegments, params.geometry.thetaStart, params.geometry.thetaLength);
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Ring({ build: false }).copy(this);
    }
  }, {
    key: 'G_innerRadius',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { innerRadius: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.innerRadius;
    }
  }, {
    key: 'G_outerRadius',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { outerRadius: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.outerRadius;
    }
  }, {
    key: 'G_thetaSegments',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { thetaSegments: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.thetaSegments;
    }
  }, {
    key: 'G_phiSegments',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { phiSegments: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.phiSegments;
    }
  }, {
    key: 'G_thetaStart',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { thetaStart: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.thetaStart;
    }
  }, {
    key: 'G_thetaLength',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { thetaLength: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.thetaLength;
    }
  }]);
  return Ring;
}(_Shape2.Shape);

exports.Ring = Ring;
//# sourceMappingURL=Ring.js.map
