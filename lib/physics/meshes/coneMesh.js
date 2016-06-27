'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConeMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConeMesh = exports.ConeMesh = function (_Mesh) {
  (0, _inherits3.default)(ConeMesh, _Mesh);

  function ConeMesh(geometry, material, mass) {
    (0, _classCallCheck3.default)(this, ConeMesh);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ConeMesh).call(this, geometry, material, mass));

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    var height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

    _this._physijs.type = 'cone';
    _this._physijs.radius = width / 2;
    _this._physijs.height = height;
    _this._physijs.mass = typeof mass === 'undefined' ? width * height : mass;
    return _this;
  }

  return ConeMesh;
}(_mesh.Mesh);
//# sourceMappingURL=coneMesh.js.map
