'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClothMesh = undefined;

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

var ClothMesh = exports.ClothMesh = function (_Mesh) {
    (0, _inherits3.default)(ClothMesh, _Mesh);

    function ClothMesh(geometry, material) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        (0, _classCallCheck3.default)(this, ClothMesh);

        var physParams = params.physics,
            geomParams = geometry.parameters;

        var mass = physParams.mass || params.mass;

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(ClothMesh).call(this, geometry, material, mass));

        _this._physijs.type = 'softClothMesh';

        var verts = geometry.attributes.position.array;

        if (!geomParams.widthSegments) geomParams.widthSegments = 1;
        if (!geomParams.heightSegments) geomParams.heightSegments = 1;

        var idx00 = 0;
        var idx01 = geomParams.widthSegments;
        var idx10 = (geomParams.heightSegments + 1) * (geomParams.widthSegments + 1) - (geomParams.widthSegments + 1);
        var idx11 = verts.length / 3 - 1;

        _this._physijs.corners = [verts[idx01 * 3], verts[idx01 * 3 + 1], verts[idx01 * 3 + 2], //   ╗
        verts[idx00 * 3], verts[idx00 * 3 + 1], verts[idx00 * 3 + 2], // ╔
        verts[idx11 * 3], verts[idx11 * 3 + 1], verts[idx11 * 3 + 2], //       ╝ 
        verts[idx10 * 3], verts[idx10 * 3 + 1], verts[idx10 * 3 + 2]];

        _this._physijs.segments = [geomParams.widthSegments + 1, geomParams.heightSegments + 1];

        _this._physijs.params = {
            friction: physParams.friction,
            damping: physParams.damping,
            margin: physParams.margin,
            klst: physParams.klst,
            kast: physParams.kast,
            kvst: physParams.kvst,
            drag: physParams.drag,
            lift: physParams.lift,
            piterations: physParams.piterations,
            viterations: physParams.viterations,
            diterations: physParams.diterations,
            citerations: physParams.citerations,
            anchorHardness: physParams.anchorHardness,
            rigidHardness: physParams.rigidHardness
        };

        _this._physijs.mass = mass;
        return _this;
    }

    (0, _createClass3.default)(ClothMesh, [{
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
    return ClothMesh;
}(_mesh.Mesh);
//# sourceMappingURL=clothMesh.js.map
