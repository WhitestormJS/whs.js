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

var _Shape3 = _interopRequireDefault(_Shape2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Skybox = function (_Shape) {
  (0, _inherits3.default)(Skybox, _Shape);

  function Skybox() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Skybox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Skybox).call(this, params, 'skybox'));

    WHS.API.extend(params, {
      skyType: 'box',
      detail: '.png',
      radius: 10,
      fog: true,
      path: ''
    });

    var skyGeometry = void 0,
        skyMat = void 0;

    switch (params.skyType) {
      case 'box':
        {
          var directions = ['xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg'],
              matArray = [];

          skyGeometry = new _three2.default.CubeGeometry(params.radius, params.radius, params.radius);

          for (var i = 0; i < 6; i++) {
            matArray.push(new MeshBasicMaterial({
              map: _three2.default.ImageUtils.loadTexture(params.path + directions[i] + params.imgSuffix),
              side: _three2.default.BackSide,
              fog: params.fog
            }));
          }

          skyMat = new _three2.default.MeshFaceMaterial(matArray);

          break;
        }
      case 'sphere':
        {
          skyGeometry = new _three2.default.SphereGeometry(params.radius / 2, 60, 40);
          skyMat = new _three2.default.MeshBasicMaterial({
            map: ImageUtils.loadTexture(params.path + params.imgSuffix),
            side: BackSide,
            fog: params.fog
          });

          break;
        }
      default:
    }

    var mesh = new _three2.default.Mesh(skyGeometry, skyMat);
    mesh.renderDepth = 1000.0;

    (0, _get3.default)((0, _getPrototypeOf2.default)(Skybox.prototype), 'setNative', _this).call(_this, mesh);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Skybox.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  return Skybox;
}(_Shape3.default);

exports.default = Skybox;
//# sourceMappingURL=Skybox.js.map
