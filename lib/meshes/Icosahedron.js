'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _whitestormjsPhysijs = require('whitestormjs-physijs');

var _whitestormjsPhysijs2 = _interopRequireDefault(_whitestormjsPhysijs);

var _Shape2 = require('../core/Shape');

var _Shape3 = _interopRequireDefault(_Shape2);

var _api = require('../extras/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icosahedron = function (_Shape) {
  (0, _inherits3.default)(Icosahedron, _Shape);

  function Icosahedron() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Icosahedron);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Icosahedron).call(this, params, 'icosahedron'));

    (0, _api.extend)(params.geometry, {

      radius: 1,
      detail: 0

    });

    _this.build(params);

    (0, _get3.default)((0, _getPrototypeOf2.default)(Icosahedron.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Icosahedron, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          Mesh = this.physics ? _whitestormjsPhysijs2.default.ConvexMesh : _three2.default.Mesh,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Icosahedron.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new Mesh(new _three2.default.IcosahedronGeometry(params.geometry.radius, params.geometry.detail), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Icosahderon(this.getParams(), this._type).copy(this);
    }
  }]);
  return Icosahedron;
}(_Shape3.default);

exports.default = Icosahedron;
//# sourceMappingURL=Icosahedron.js.map
