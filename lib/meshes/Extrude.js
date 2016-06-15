'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Extrude = undefined;

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

var Extrude = function (_Shape) {
  (0, _inherits3.default)(Extrude, _Shape);

  function Extrude() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Extrude);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Extrude).call(this, params, 'extrude'));

    (0, _api.extend)(params.geometry, {
      shapes: [],
      options: {}
    });

    if (params.build) {
      _this.build(params);
      (0, _get3.default)(Object.getPrototypeOf(Extrude.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  (0, _createClass3.default)(Extrude, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _physi2.default.ConvexMesh : THREE.Mesh,
          material = (0, _get3.default)(Object.getPrototypeOf(Extrude.prototype), '_initMaterial', this).call(this, params.material);

      return new Promise(function (resolve) {
        _scope.setNative(new Mesh(_this2.buildGeometry(params), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      return new THREE.ExtrudeGeometry(params.geometry.shapes, params.geometry.options);
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Extrude({ build: false }).copy(this);
    }
  }, {
    key: 'G_shapes',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { shapes: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.shapes;
    }
  }, {
    key: 'G_options',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { options: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.options;
    }
  }]);
  return Extrude;
}(_Shape2.Shape);

exports.Extrude = Extrude;
//# sourceMappingURL=Extrude.js.map
