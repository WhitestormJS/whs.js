'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Box = undefined;

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

var THREE = _interopRequireWildcard(_three);

var _physi = require('../physics/physi.js');

var _physi2 = _interopRequireDefault(_physi);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Box = function (_Shape) {
  (0, _inherits3.default)(Box, _Shape);

  function Box() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Box);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Box).call(this, params, 'box'));

    (0, _api.extend)(params.geometry, {
      width: 1,
      height: 1,
      depth: 1
    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Box.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  (0, _createClass3.default)(Box, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var Mesh = this.physics ? _physi2.default.BoxMesh : THREE.Mesh;
      var material = (0, _get3.default)((0, _getPrototypeOf2.default)(Box.prototype), '_initMaterial', this).call(this, params.material);

      return new _promise2.default(function (resolve) {
        _this2.setNative(new Mesh(new THREE.BoxGeometry(params.geometry.width, params.geometry.height, params.geometry.depth), material, params.mass));

        resolve();
      });
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Box(this.getParams(), this._type).copy(this);
    }
  }]);
  return Box;
}(_Shape2.Shape);

exports.Box = Box;
//# sourceMappingURL=Box.js.map
