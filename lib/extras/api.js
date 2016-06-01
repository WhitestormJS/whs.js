'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMaterial = exports.extend = exports.texture = exports.loadTexture = exports.loadJson = exports.loadFont = undefined;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _whitestormjsPhysijs = require('whitestormjs-physijs');

var _whitestormjsPhysijs2 = _interopRequireDefault(_whitestormjsPhysijs);

var _loader = require('../utils/loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extend = _assign2.default;

var texture = function texture(url, options) {
  var texture = (0, _loader.loadTexture)(url);

  if (options) {
    var opt = (0, _assign2.default)({}, options, {
      offset: {
        x: 0,
        y: 0
      },
      repeat: {
        x: 1,
        y: 1
      }
    });

    texture.wrapS = texture.wrapT = _three2.default.RepeatWrapping;

    texture.offset.set(opt.offset.x, opt.offset.y);
    texture.repeat.set(opt.repeat.x, opt.repeat.y);

    texture.magFilter = _three2.default.NearestFilter;
    texture.minFilter = _three2.default.LinearMipMapLinearFilter;
  }

  return texture;
};

var loadMaterial = function loadMaterial() {
  var material = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var isPhysics = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  if (typeof material.kind !== 'string') console.error('Type of material is undefined or not a string. @loadMaterial');

  var scope = {
    _type: material.kind,
    _restitution: !isNaN(parseFloat(material.restitution)) ? material.restitution : !isNaN(parseFloat(material.rest)) ? material.rest : 0.3,
    _friction: !isNaN(parseFloat(material.friction)) ? material.friction : !isNaN(parseFloat(material.fri)) ? material.fri : 0.8
  };

  if (material.texture) material.map = texture(material.texture);

  var params = (0, _assign2.default)({}, material);

  delete params.kind;

  delete params.friction;
  delete params.fri;

  delete params.restitution;
  delete params.rest;

  delete params.useCustomMaterial;
  delete params.useVertexColors;

  switch (material.kind) {
    case 'basic':
      scope._material = new _three2.default.MeshBasicMaterial(params);
      break;

    case 'linebasic':
      scope._material = new _three2.default.LineBasicMaterial(params);
      break;

    case 'linedashed':
      scope._material = new _three2.default.LineDashedMaterial(params);
      break;

    case 'material':
      scope._material = new _three2.default.Material(params);
      break;

    case 'depth':
      scope._material = new _three2.default.MeshDepthMaterial(params);
      break;

    case 'face':
      scope._material = new _three2.default.MeshFaceMaterial(params);
      break;

    case 'lambert':
      scope._material = new _three2.default.MeshLambertMaterial(params);
      break;

    case 'normal':
      scope._material = new _three2.default.MeshNormalMaterial(params);
      break;

    case 'phong':
      scope._material = new _three2.default.MeshPhongMaterial(params);
      break;

    case 'pointcloud':
      scope._material = new _three2.default.PointCloudMaterial(params);
      break;

    case 'rawshader':
      scope._material = new _three2.default.RawShaderMaterial(params);
      break;

    case 'shader':
      scope._material = new _three2.default.ShaderMaterial(params);
      break;

    case 'spritecanvas':
      scope._material = new _three2.default.SpriteCanvasMaterial(params);
      break;

    case 'sprite':
      scope._material = new _three2.default.SpriteMaterial(params);
      break;

    default:
  }

  if (isPhysics) {
    scope._materialP = _whitestormjsPhysijs2.default.createMaterial(scope._material, scope._friction, scope._restitution);
  }

  return scope;
};

exports.loadFont = _loader.loadFont;
exports.loadJson = _loader.loadJson;
exports.loadTexture = _loader.loadTexture;
exports.texture = texture;
exports.extend = extend;
exports.loadMaterial = loadMaterial;
//# sourceMappingURL=api.js.map
