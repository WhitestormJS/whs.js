'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConvexMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConvexMesh = exports.ConvexMesh = function (_Mesh) {
    (0, _inherits3.default)(ConvexMesh, _Mesh);

    function ConvexMesh(geometry, material) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        (0, _classCallCheck3.default)(this, ConvexMesh);

        var physParams = params.physics;
        var mass = physParams.mass || params.mass;

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ConvexMesh).call(this, geometry, material, mass));

        if (!geometry.boundingBox) geometry.computeBoundingBox();

        var data = new Float32Array(geometry.vertices.length * 3);

        for (var i = 0; i < geometry.vertices.length; i++) {
            data[i * 3] = geometry.vertices[i].x;
            data[i * 3 + 1] = geometry.vertices[i].y;
            data[i * 3 + 2] = geometry.vertices[i].z;
        }

        var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        var height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        var depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        _this._physijs.type = 'convex';
        _this._physijs.data = data;
        _this._physijs.mass = mass;

        _this._physijs.params = {
            friction: physParams.friction,
            restitution: physParams.restitution,
            damping: physParams.damping,
            margin: physParams.margin
        };
        return _this;
    }

    return ConvexMesh;
}(_mesh.Mesh);