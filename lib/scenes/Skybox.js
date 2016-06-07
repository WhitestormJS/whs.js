'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skybox = undefined;

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

var THREE = _interopRequireWildcard(_three);

var _Shape2 = require('../core/Shape');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

          skyGeometry = new THREE.CubeGeometry(params.radius, params.radius, params.radius);

          for (var i = 0; i < 6; i++) {
            matArray.push(new MeshBasicMaterial({
              map: THREE.ImageUtils.loadTexture(params.path + directions[i] + params.imgSuffix),
              side: THREE.BackSide,
              fog: params.fog
            }));
          }

          skyMat = new THREE.MeshFaceMaterial(matArray);

          break;
        }
      case 'sphere':
        {
          skyGeometry = new THREE.SphereGeometry(params.radius / 2, 60, 40);
          skyMat = new THREE.MeshBasicMaterial({
            map: ImageUtils.loadTexture(params.path + params.imgSuffix),
            side: BackSide,
            fog: params.fog
          });

          break;
        }
      default:
    }

    var mesh = new THREE.Mesh(skyGeometry, skyMat);
    mesh.renderDepth = 1000.0;

    (0, _get3.default)((0, _getPrototypeOf2.default)(Skybox.prototype), 'setNative', _this).call(_this, mesh);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Skybox.prototype), 'wrap', _this).call(_this);
    return _this;
  }

  return Skybox;
}(_Shape2.Shape);

exports.Skybox = Skybox;
//# sourceMappingURL=Skybox.js.map
