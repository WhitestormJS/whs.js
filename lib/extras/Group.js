'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Group = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _Shape2 = require('../core/Shape');

var _Object = require('../core/Object');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Group = function (_Shape) {
  (0, _inherits3.default)(Group, _Shape);

  function Group() {
    (0, _classCallCheck3.default)(this, Group);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Group).call(this, {}, 'group'));

    (0, _get3.default)(Object.getPrototypeOf(Group.prototype), 'setNative', _this).call(_this, new THREE.Object3D());
    (0, _get3.default)(Object.getPrototypeOf(Group.prototype), 'wrap', _this).call(_this);

    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
      objects[_key] = arguments[_key];
    }

    for (var i = 0; i < objects.length; i++) {
      var obj = objects[i];

      if (obj instanceof _Object.WHSObject) obj.addTo(_this);else if (obj instanceof THREE.Object3D) _this.getNative().add(obj);
    }
    return _this;
  }

  return Group;
}(_Shape2.Shape);

exports.Group = Group;