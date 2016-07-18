'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SphereMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mesh = require('../core/mesh');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SphereMesh = exports.SphereMesh = function (_Mesh) {
    (0, _inherits3.default)(SphereMesh, _Mesh);

    function SphereMesh(geometry, material) {
        var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        (0, _classCallCheck3.default)(this, SphereMesh);

        var physParams = params.physics;
        var mass = physParams.mass || params.mass;

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(SphereMesh).call(this, geometry, material, mass));

        if (!geometry.boundingSphere) geometry.computeBoundingSphere();
        _this._physijs.type = 'sphere';
        _this._physijs.radius = geometry.boundingSphere.radius;

        _this._physijs.params = {
            friction: physParams.friction,
            restitution: physParams.restitution,
            damping: physParams.damping,
            margin: physParams.margin
        };

        _this._physijs.mass = mass;
        return _this;
    }

    return SphereMesh;
}(_mesh.Mesh);