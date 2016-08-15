'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = undefined;

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

var _api = require('./api');

var _index = require('../physics/index.js');

var _Shape2 = require('../core/Shape');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Line = function (_Shape) {
  (0, _inherits3.default)(Line, _Shape);

  function Line(params) {
    (0, _classCallCheck3.default)(this, Line);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Line).call(this, params, 'line'));

    (0, _api.extend)(params.geometry, {
      curve: false,
      points: 50
    });

    if (params.build) {
      _this.build(params);
      (0, _get3.default)(Object.getPrototypeOf(Line.prototype), 'wrap', _this).call(_this);
    }
    return _this;
  }

  (0, _createClass3.default)(Line, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var material = (0, _api.loadMaterial)(params.material);

      var Mesh = void 0;

      if (this.physics) Mesh = _index.RopeMesh;else Mesh = THREE.Line;

      return new Promise(function (resolve) {
        _this2.setNative(new Mesh(_this2.buildGeometry(params), material, _this2.getParams()));

        resolve();
      });
    }
  }, {
    key: 'buildGeometry',
    value: function buildGeometry() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var geometry = params.buffer || params.physics ? new THREE.BufferGeometry() : new THREE.Geometry();

      if (params.buffer || params.physics) {
        var pp = params.geometry.curve.getPoints(params.geometry.points);
        var verts = new Float32Array(pp.length * 3);

        for (var i = 0, max = pp.length; i < max; i++) {
          verts[i * 3] = pp[i].x;
          verts[i * 3 + 1] = pp[i].y;
          verts[i * 3 + 2] = pp[i].z;
        }

        geometry.addAttribute('position', new THREE.BufferAttribute(verts, 3));
      } else geometry.vertices = params.geometry.curve.getPoints(params.geometry.points);

      if (params.softbody) this.proccessSoftbodyGeometry(geometry);

      return geometry;
    }
  }]);
  return Line;
}(_Shape2.Shape);

exports.Line = Line;
//# sourceMappingURL=Line.js.map
