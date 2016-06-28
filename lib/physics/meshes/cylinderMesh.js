'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CylinderMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CylinderMesh = exports.CylinderMesh = function (_Mesh) {
    (0, _inherits3.default)(CylinderMesh, _Mesh);

    function CylinderMesh(geometry, material, mass) {
        (0, _classCallCheck3.default)(this, CylinderMesh);

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(CylinderMesh).call(this, geometry, material, mass));

        if (!geometry.boundingBox) geometry.computeBoundingBox();

        var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        var height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        var depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        _this._physijs.type = 'cylinder';
        _this._physijs.width = width;
        _this._physijs.height = height;
        _this._physijs.depth = depth;
        _this._physijs.mass = typeof mass === 'undefined' ? width * height * depth : mass;
        return _this;
    }

    return CylinderMesh;
}(_mesh.Mesh);
//# sourceMappingURL=cylinderMesh.js.map
