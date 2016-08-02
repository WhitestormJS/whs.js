'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SoftMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SoftMesh = exports.SoftMesh = function (_Mesh) {
    (0, _inherits3.default)(SoftMesh, _Mesh);

    function SoftMesh(geometry, material) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        (0, _classCallCheck3.default)(this, SoftMesh);

        var physParams = params.physics;
        var mass = physParams.mass || params.mass;
        var tempGeometry = geometry.clone();

        if (!(geometry instanceof THREE.BufferGeometry)) // Converts to BufferGeometry.
            geometry = new THREE.BufferGeometry().fromGeometry(geometry);

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(SoftMesh).call(this, geometry, material, mass));

        tempGeometry.mergeVertices();
        var idxGeometry = _this.createIndexedBufferGeometryFromGeometry(tempGeometry);
        _this.tempGeometry = tempGeometry;

        var aVertices = idxGeometry.attributes.position.array;
        var aIndices = idxGeometry.index.array;
        var aIdxAssoc = [];
        var vertices = geometry.attributes.position.array;

        var numIdxVertices = aVertices.length / 3;
        var numVertices = vertices.length / 3;

        for (var i = 0; i < numIdxVertices; i++) {
            var association = [];
            aIdxAssoc.push(association);

            var i3 = i * 3;

            for (var j = 0; j < numVertices; j++) {
                var j3 = j * 3;

                if (_this.isEqual(aVertices[i3], aVertices[i3 + 1], aVertices[i3 + 2], vertices[j3], vertices[j3 + 1], vertices[j3 + 2])) association.push(j3);
            }
        }

        _this._physijs.type = 'softTrimesh';
        _this._physijs.aVertices = aVertices;
        _this._physijs.aIndices = aIndices;
        _this._physijs.aIdxAssoc = aIdxAssoc;

        _this._physijs.params = {
            friction: physParams.friction,
            damping: physParams.damping,
            pressure: physParams.pressure,
            margin: physParams.margin,
            stiffness: physParams.stiffness,
            drag: physParams.drag,
            lift: physParams.lift,
            anchorHardness: physParams.anchorHardness,
            rigidHardness: physParams.rigidHardness
        };

        _this._physijs.mass = mass;
        return _this;
    }

    (0, _createClass3.default)(SoftMesh, [{
        key: 'createIndexedBufferGeometryFromGeometry',
        value: function createIndexedBufferGeometryFromGeometry(geometry) {
            var numVertices = geometry.vertices.length;
            var numFaces = geometry.faces.length;
            var bufferGeom = new THREE.BufferGeometry();
            var vertices = new Float32Array(numVertices * 3);
            var indices = new (numFaces * 3 > 65535 ? Uint32Array : Uint16Array)(numFaces * 3);

            for (var i = 0; i < numVertices; i++) {
                var p = geometry.vertices[i];
                var i3 = i * 3;

                vertices[i3] = p.x;
                vertices[i3 + 1] = p.y;
                vertices[i3 + 2] = p.z;
            }

            for (var _i = 0; _i < numFaces; _i++) {
                var f = geometry.faces[_i];
                var _i2 = _i * 3;

                indices[_i2] = f.a;
                indices[_i2 + 1] = f.b;
                indices[_i2 + 2] = f.c;
            }

            bufferGeom.setIndex(new THREE.BufferAttribute(indices, 1));
            bufferGeom.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

            return bufferGeom;
        }
    }, {
        key: 'isEqual',
        value: function isEqual(x1, y1, z1, x2, y2, z2) {
            var delta = 0.000001;

            return Math.abs(x2 - x1) < delta && Math.abs(y2 - y1) < delta && Math.abs(z2 - z1) < delta;
        }
    }, {
        key: 'appendAnchor',
        value: function appendAnchor(world, object, node, influence) {
            var collisionBetweenLinkedBodies = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

            var o1 = this._physijs.id;
            var o2 = object._physijs.id;

            world.execute('appendAnchor', {
                obj: o1,
                obj2: o2,
                node: node,
                influence: influence,
                collisionBetweenLinkedBodies: collisionBetweenLinkedBodies
            });
        }
    }]);
    return SoftMesh;
}(_mesh.Mesh);
//# sourceMappingURL=softMesh.js.map
