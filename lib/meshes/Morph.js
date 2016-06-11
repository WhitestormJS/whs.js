'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Morph = undefined;

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

var _loaders = require('../utils/loaders');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Morph = function (_Shape) {
  (0, _inherits3.default)(Morph, _Shape);

  function Morph() {
    var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Morph);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Morph).call(this, params, 'morph'));

    (0, _api.extend)(params.geometry, {
      path: ''
    });

    _this.build(params);
    (0, _get3.default)((0, _getPrototypeOf2.default)(Morph.prototype), 'wrap', _this).call(_this, 'wait');
    return _this;
  }

  (0, _createClass3.default)(Morph, [{
    key: 'build',
    value: function build() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _scope = this;

      var promise = new _promise2.default(function (resolve) {
        _loaders.JSONLoader.load(params.geometry.path, function (data, materials) {
          var material = void 0;
          if (params.material.useVertexColors) {
            material = (0, _api.loadMaterial)((0, _api.extend)(params.material, {
              morphTargets: true,
              vertexColors: THREE.FaceColors
            }))._material;
          } else if (!materials || params.material.useCustomMaterial) {
            material = (0, _api.loadMaterial)(params.material)._material;
          } else material = new THREE.MultiMaterial(materials);

          data.computeFaceNormals();
          data.computeVertexNormals();

          // Visualization.
          var mesh = new THREE.Mesh(data, material);
          mesh.speed = params.morph.speed;
          mesh.mixer = new THREE.AnimationMixer(mesh);

          mesh.mixer.clipAction(data.animations[0]).setDuration(params.morph.duration).play();

          _scope.setNative(mesh);

          resolve();
        });
      });

      (0, _get3.default)((0, _getPrototypeOf2.default)(Morph.prototype), 'wait', this).call(this, promise);

      return promise;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new Morph(this.getParams(), this._type).copy(this);
    }
  }]);
  return Morph;
}(_Shape2.Shape);

exports.Morph = Morph;
//# sourceMappingURL=Morph.js.map
