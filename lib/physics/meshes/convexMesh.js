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

    function ConvexMesh(geom, material) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var cGeometry = arguments[3];
        (0, _classCallCheck3.default)(this, ConvexMesh);

        var physParams = params.physics;
        var mass = physParams.mass || params.mass;

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ConvexMesh).call(this, geom, material, mass));

        if (!geom.boundingBox) geom.computeBoundingBox();

        var geometry = cGeometry ? cGeometry : geom,
            data = new Float32Array(geometry.vertices.length * 3);

        var cScale = params.scale || { x: 1, y: 1, z: 1 };
        cScale.x = cScale.x || 1;
        cScale.y = cScale.y || 1;
        cScale.z = cScale.z || 1;

        for (var i = 0; i < geometry.vertices.length; i++) {
            data[i * 3] = geometry.vertices[i].x * cScale.x;
            data[i * 3 + 1] = geometry.vertices[i].y * cScale.y;
            data[i * 3 + 2] = geometry.vertices[i].z * cScale.z;
        }

        var width = geom.boundingBox.max.x - geom.boundingBox.min.x;
        var height = geom.boundingBox.max.y - geom.boundingBox.min.y;
        var depth = geom.boundingBox.max.z - geom.boundingBox.min.z;

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
//# sourceMappingURL=convexMesh.js.map
