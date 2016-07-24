'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeightfieldMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HeightfieldMesh = exports.HeightfieldMesh = function (_Mesh) {
    (0, _inherits3.default)(HeightfieldMesh, _Mesh);

    function HeightfieldMesh(geometry, material) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var xdiv = arguments[3];
        var ydiv = arguments[4];
        (0, _classCallCheck3.default)(this, HeightfieldMesh);

        var physParams = params.physics;
        var mass = physParams.mass || params.mass;

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(HeightfieldMesh).call(this, geometry, material, mass));

        geometry.computeBoundingBox();

        var isBuffer = geometry instanceof THREE.BufferGeometry;
        var verts = isBuffer ? geometry.attributes.position.array : geometry.vertices;

        var size = isBuffer ? verts.length / 3 : verts.length;

        _this._physijs.type = 'heightfield';
        _this._physijs.xsize = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        _this._physijs.ysize = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
        _this._physijs.xpts = typeof xdiv === 'undefined' ? Math.sqrt(size) : xdiv + 1;
        _this._physijs.ypts = typeof ydiv === 'undefined' ? Math.sqrt(size) : ydiv + 1;

        // note - this assumes our plane geometry is square, unless we pass in specific xdiv and ydiv
        _this._physijs.absMaxHeight = Math.max(geometry.boundingBox.max.z, Math.abs(geometry.boundingBox.min.z));

        var points = new Float32Array(size),
            xpts = _this._physijs.xpts,
            ypts = _this._physijs.ypts;

        while (size--) {
            var vNum = size % xpts + (ypts - Math.round(size / xpts - size % xpts / xpts) - 1) * ypts;

            if (isBuffer) points[size] = verts[vNum * 3 + 2];else points[size] = verts[vNum].z;
        }

        _this._physijs.points = points;

        _this._physijs.params = {
            friction: physParams.friction,
            restitution: physParams.restitution,
            damping: physParams.damping,
            margin: physParams.margin
        };

        _this._physijs.mass = mass;
        return _this;
    }

    return HeightfieldMesh;
}(_mesh.Mesh);
//# sourceMappingURL=heightfieldMesh.js.map
