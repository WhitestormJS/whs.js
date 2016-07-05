'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConcaveMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConcaveMesh = exports.ConcaveMesh = function (_Mesh) {
    (0, _inherits3.default)(ConcaveMesh, _Mesh);

    function ConcaveMesh(geom, material, mass, cGeometry, cScale) {
        (0, _classCallCheck3.default)(this, ConcaveMesh);

        var geometry = cGeometry ? cGeometry : geom,
            data = new Float32Array(geometry.faces.length * 9);

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ConcaveMesh).call(this, geom, material, mass));

        if (!geometry.boundingBox) geometry.computeBoundingBox();

        cScale = cScale || { x: 1, y: 1, z: 1 };
        cScale.x = cScale.x || 1;
        cScale.y = cScale.y || 1;
        cScale.z = cScale.z || 1;

        var vertices = geometry.vertices;

        for (var i = 0; i < geometry.faces.length; i++) {
            var face = geometry.faces[i];

            data[i * 9] = vertices[face.a].x * cScale.x;
            data[i * 9 + 1] = vertices[face.a].y * cScale.y;
            data[i * 9 + 2] = vertices[face.a].z * cScale.z;

            data[i * 9 + 3] = vertices[face.b].x * cScale.x;
            data[i * 9 + 4] = vertices[face.b].y * cScale.y;
            data[i * 9 + 5] = vertices[face.b].z * cScale.z;

            data[i * 9 + 6] = vertices[face.c].x * cScale.x;
            data[i * 9 + 7] = vertices[face.c].y * cScale.y;
            data[i * 9 + 8] = vertices[face.c].z * cScale.z;
        }

        var width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        var height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        var depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        _this._physijs.type = 'concave';
        _this._physijs.data = data;
        _this._physijs.mass = typeof mass === 'undefined' ? width * height * depth : mass;
        return _this;
    }

    return ConcaveMesh;
}(_mesh.Mesh);
//# sourceMappingURL=concaveMesh.js.map
