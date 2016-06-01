'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _Shape2 = require('../core/Shape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = function (_Shape) {
  (0, _inherits3.default)(Group, _Shape);

  function Group() {
    (0, _classCallCheck3.default)(this, Group);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Group).call(this, {}, 'group'));

    (0, _get3.default)((0, _getPrototypeOf2.default)(Group.prototype), 'setNative', _this).call(_this, new Object3D());
    (0, _get3.default)((0, _getPrototypeOf2.default)(Group.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  return Group;
}(_Shape2.Shape);

exports.default = Group;
//# sourceMappingURL=Group.js.map
