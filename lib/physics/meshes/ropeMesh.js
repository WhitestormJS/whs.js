'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RopeMesh = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _line = require('../core/line');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RopeMesh = exports.RopeMesh = function (_Line) {
  (0, _inherits3.default)(RopeMesh, _Line);

  function RopeMesh(geometry, material) {
    var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    (0, _classCallCheck3.default)(this, RopeMesh);

    var physParams = params.physics;

    var mass = physParams.mass || params.mass;

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(RopeMesh).call(this, geometry, material, mass));

    _this._physijs.type = 'softRopeMesh';

    var v1 = params.geometry.curve.getPoint(0);
    var v2 = params.geometry.curve.getPoint(1);

    _this._physijs.data = [v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, params.geometry.points];

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

  (0, _createClass3.default)(RopeMesh, [{
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
  return RopeMesh;
}(_line.Line);
//# sourceMappingURL=ropeMesh.js.map
