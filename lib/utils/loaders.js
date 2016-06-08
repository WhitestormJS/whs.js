'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontLoader = exports.TextureLoader = exports.JSONLoader = undefined;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var JSONLoader = new THREE.JSONLoader();
var TextureLoader = new THREE.TextureLoader();
var FontLoader = new THREE.FontLoader();

exports.JSONLoader = JSONLoader;
exports.TextureLoader = TextureLoader;
exports.FontLoader = FontLoader;
//# sourceMappingURL=loaders.js.map
