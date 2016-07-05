'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoxMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BoxMesh = exports.BoxMesh = function (_Mesh) {
  (0, _inherits3.default)(BoxMesh, _Mesh);

  function BoxMesh(geometry, material) {
    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    (0, _classCallCheck3.default)(this, BoxMesh);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(BoxMesh).call(this, geometry, material, params.mass));

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    var height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    var depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    _this._physijs.type = 'box';
    _this._physijs.width = width;
    _this._physijs.height = height;
    _this._physijs.depth = depth;
    _this._physijs.mass = typeof params.mass === 'undefined' ? width * height * depth : params.mass;
    return _this;
  }

  return BoxMesh;
}(_mesh.Mesh);
//# sourceMappingURL=boxMesh.js.map
