'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadMaterial = exports.extend = exports.texture = exports.TextureLoader = exports.JSONLoader = exports.FontLoader = undefined;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _index = require('../physics/index.js');

var Physijs = _interopRequireWildcard(_index);

var _loaders = require('../utils/loaders');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var extend = function extend(object) {
  for (var _len = arguments.length, extensions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    extensions[_key - 1] = arguments[_key];
  }

  // $.extend alternative, ... is the spread operator.
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = extensions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var extension = _step.value;

      // console.log(extension);
      // console.log(typeof extension);

      if (!extension) continue; // Ignore null and undefined objects and paramaters.

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.getOwnPropertyNames(extension)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var prop = _step2.value;
          // Do not traverse the prototype chain.
          if (object[prop] !== undefined && object[prop].toString() === '[object Object]' && extension[prop].toString() === '[object Object]')

            // Goes deep only if object[prop] and extension[prop] are both objects !
            extend(object[prop], extension[prop]);else object[prop] = object[prop] === 0 ? 0 : object[prop];
          if (typeof object[prop] === 'undefined') object[prop] = extension[prop]; // Add values that do not already exist.
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return object;
};

var texture = function texture(url) {
  var repeat = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var texture = _loaders.TextureLoader.load(url);

  if (repeat) {
    var opt = extend(repeat, {
      offset: {
        x: 0,
        y: 0
      },
      repeat: {
        x: 1,
        y: 1
      }
    });

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    texture.offset.set(opt.offset.x, opt.offset.y);
    texture.repeat.set(opt.repeat.x, opt.repeat.y);

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
  }

  return texture;
};

var loadMaterial = function loadMaterial() {
  var material = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (typeof material.kind !== 'string') console.error('Type of material is undefined or not a string. @loadMaterial');

  var scope = {
    _type: material.kind,
    _restitution: !isNaN(parseFloat(material.restitution)) ? material.restitution : !isNaN(parseFloat(material.rest)) ? material.rest : 0.3,
    _friction: !isNaN(parseFloat(material.friction)) ? material.friction : !isNaN(parseFloat(material.fri)) ? material.fri : 0.8
  };

  console.log(material);

  if (material.texture) material.map = texture(material.texture);

  var params = Object.assign({}, material);

  delete params.kind;

  delete params.friction;
  delete params.fri;

  delete params.restitution;
  delete params.rest;

  delete params.useCustomMaterial;
  delete params.useVertexColors;

  switch (material.kind) {
    case 'basic':
      scope._material = new THREE.MeshBasicMaterial(params);
      break;

    case 'linebasic':
      scope._material = new THREE.LineBasicMaterial(params);
      break;

    case 'linedashed':
      scope._material = new THREE.LineDashedMaterial(params);
      break;

    case 'material':
      scope._material = new THREE.Material(params);
      break;

    case 'depth':
      scope._material = new THREE.MeshDepthMaterial(params);
      break;

    case 'face':
      scope._material = new THREE.MeshFaceMaterial(params);
      break;

    case 'lambert':
      scope._material = new THREE.MeshLambertMaterial(params);
      break;

    case 'normal':
      scope._material = new THREE.MeshNormalMaterial(params);
      break;

    case 'phong':
      scope._material = new THREE.MeshPhongMaterial(params);
      break;

    case 'pointcloud':
      scope._material = new THREE.PointCloudMaterial(params);
      break;

    case 'rawshader':
      scope._material = new THREE.RawShaderMaterial(params);
      break;

    case 'shader':
      scope._material = new THREE.ShaderMaterial(params);
      break;

    case 'spritecanvas':
      scope._material = new THREE.SpriteCanvasMaterial(params);
      break;

    case 'sprite':
      scope._material = new THREE.SpriteMaterial(params);
      break;

    default:
  }

  if (!!'physics') {
    scope._materialP = Physijs.createMaterial(scope._material, scope._friction, scope._restitution);
  }

  return scope;
};

exports.FontLoader = _loaders.FontLoader;
exports.JSONLoader = _loaders.JSONLoader;
exports.TextureLoader = _loaders.TextureLoader;
exports.texture = texture;
exports.extend = extend;
exports.loadMaterial = loadMaterial;
//# sourceMappingURL=api.js.map
