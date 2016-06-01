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

var _Shape2 = require('../core/Shape');

var _Shape3 = _interopRequireDefault(_Shape2);

var _api = require('../extras/api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Shape2D = function (_Shape) {
  (0, _inherits3.default)(Shape2D, _Shape);

  function Shape2D() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Shape2D);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Shape2D).call(this, params, 'shape2D'));

    (0, _api.extend)(params.geometry, {
      shapes: []
    });

    (0, _get3.default)((0, _getPrototypeOf2.default)(Shape2D.prototype), 'build', _this).call(_this, params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Shape2D.prototype), 'wrap', _this).call(_this, 'onlyvis');
    return _this;
  }

  (0, _createClass3.default)(Shape2D, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this,
          material = (0, _get3.default)((0, _getPrototypeOf2.default)(Shape2D.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _scope.setNative(new _three2.default.Mesh(new _three2.default.ShapeGeometry(params.geometry.shapes), material));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Shape2D(this.getParams(), this._type).copy(this);
    }
  }]);
  return Shape2D;
}(_Shape3.default);

exports.default = Shape2D;
//# sourceMappingURL=Shape2D.js.map
