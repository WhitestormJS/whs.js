'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CapsuleMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CapsuleMesh = exports.CapsuleMesh = function (_Mesh) {
    (0, _inherits3.default)(CapsuleMesh, _Mesh);

    function CapsuleMesh(geometry, material) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        (0, _classCallCheck3.default)(this, CapsuleMesh);

        var physParams = params.physics;
        var mass = physParams.mass || params.mass;

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(CapsuleMesh).call(this, geometry, material, mass));

        if (!geometry.boundingBox) geometry.computeBoundingBox();

        var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        var height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        var depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        _this._physijs.type = 'capsule';
        _this._physijs.radius = Math.max(width / 2, depth / 2);
        _this._physijs.height = height;
        _this._physijs.mass = mass;

        _this._physijs.params = {
            friction: physParams.friction,
            restitution: physParams.restitution,
            damping: physParams.damping,
            margin: physParams.margin
        };
        return _this;
    }

    return CapsuleMesh;
}(_mesh.Mesh);
//# sourceMappingURL=capsuleMesh.js.map
