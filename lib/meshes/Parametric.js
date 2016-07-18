'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Parametric = undefined;

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

var Physijs = _interopRequireWildcard(_index);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parametric = function (_Shape) {
  (0, _inherits3.default)(Parametric, _Shape);

  function Parametric() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Parametric);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Parametric).call(this, params, 'parametric'));

    (0, _api.extend)(params.geometry, {
      func: function func() {},

      slices: 10,
      stacks: 10
    });

    if (params.build) {
      _this.build(params);
      (0, _get3.default)(Object.getPrototypeOf(Parametric.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  (0, _createClass3.default)(Parametric, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var material = (0, _get3.default)(Object.getPrototypeOf(Parametric.prototype), '_initMaterial', this).call(this, params.material);

      var Mesh = void 0;

      if (this.physics && this.getParams().softbody) Mesh = Physijs.SoftMesh;else if (this.physics && this.physics.type === 'concave') Mesh = Physijs.ConcaveMesh;else if (this.physics) Mesh = Physijs.ConvexMesh;else Mesh = THREE.Mesh;

      return new Promise(function (resolve) {
        _this2.setNative(new Mesh(_this2.buildGeometry(params), material, _this2.getParams()));

        resolve();
      });
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var GConstruct = params.buffer && !params.softbody ? THREE.ParametricBufferGeometry : THREE.ParametricGeometry;

      return new GConstruct(params.geometry.func, params.geometry.slices, params.geometry.stacks);
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Parametric({ build: false }).copy(this);
    }
  }, {
    key: 'G_func',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { func: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.func;
    }
  }, {
    key: 'G_slices',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { slices: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.slices;
    }
  }, {
    key: 'G_stacks',
    set: function set(val) {
      this.native.geometry = this.buildGeometry(this.updateParams({ geometry: { stacks: val } }));
    },
    get: function get() {
      return this.native.geometry.parameters.stacks;
    }
  }]);
  return Parametric;
}(_Shape2.Shape);

exports.Parametric = Parametric;