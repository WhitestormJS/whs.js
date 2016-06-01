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

      var promise = new _promise2.default(function (resolve, reject) {
        (0, _api.loadJSON)(params.geometry.path, function (data, materials) {
          if (params.material.useVertexColors) {
            material = (0, _api.loadMaterial)((0, _api.extend)(params.material, {
              morphTargets: true,
              vertexColors: _three2.default.FaceColors
            }))._material;
          } else if (!materials || params.material.useCustomMaterial) {
            material = (0, _api.loadMaterial)(params.material)._material;
          } else material = new _three2.default.MultiMaterial(materials);

          data.computeFaceNormals();
          data.computeVertexNormals();

          // Visualization.
          var mesh = new _three2.default.Mesh(data, material);
          mesh.speed = params.morph.speed;
          mesh.mixer = new _three2.default.AnimationMixer(mesh);

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
}(_Shape3.default);

exports.default = Morph;
//# sourceMappingURL=Morph.js.map
