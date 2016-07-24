'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = undefined;

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

var _index = require('../physics/index.js');

var _index2 = _interopRequireDefault(_index);

var _Shape2 = require('../core/Shape');

var _api = require('../extras/api');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function (_Shape) {
  (0, _inherits3.default)(Text, _Shape);

  function Text() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Text);

    var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Text).call(this, params, 'text'));

    (0, _api.extend)(params.geometry, {
      text: 'Hello World!',

      parameters: {
        size: 12,
        height: 50,
        curveSegments: 12,
        font: new THREE.Font(),
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8
      }
    });

    if (params.build) {
      _this.build(params);
      (0, _get3.default)(Object.getPrototypeOf(Text.prototype), 'wrap', _this).call(_this, 'wait');
    }
    return _this;
  }

  (0, _createClass3.default)(Text, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var material = (0, _get3.default)(Object.getPrototypeOf(Text.prototype), '_initMaterial', this).call(this, params.material);

      var Mesh = void 0;

      if (this.physics && this.getParams().softbody) Mesh = _index2.default.SoftMesh;else if (this.physics && this.physics.type === 'concave') Mesh = _index2.default.ConcaveMesh;else if (this.physics) Mesh = _index2.default.ConvexMesh;else Mesh = THREE.Mesh;

      var promise = new Promise(function (resolve) {
        _api.FontLoader.load(params.geometry.parameters.font, function (font) {
          params.geometry.parameters.font = font;

          _this2.setNative(new Mesh(new THREE.TextGeometry(params.geometry.text, params.geometry.parameters), material, _this2.getParams()));

          resolve();
        });
      });

      (0, _get3.default)(Object.getPrototypeOf(Text.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Text({ build: false }).copy(this);
    }
  }]);
  return Text;
}(_Shape2.Shape);

exports.Text = Text;
//# sourceMappingURL=Text.js.map
