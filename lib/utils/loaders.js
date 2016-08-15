'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialLoader = exports.ImageLoader = exports.AudioLoader = exports.XHRLoader = exports.FontLoader = exports.TextureLoader = exports.ObjectLoader = exports.BufferGeometryLoader = exports.JSONLoader = undefined;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Models.
var JSONLoader = new THREE.JSONLoader();
// const OBJLoader = new THREE.OBJLoader();
// const BabylonLoader = new THREE.BabylonLoader();
var BufferGeometryLoader = new THREE.BufferGeometryLoader();
// const ColladaLoader = new THREE.ColladaLoader();
// const glTFLoader = new THREE.glTFLoader();
var ObjectLoader = new THREE.ObjectLoader();
// const PDBLoader = new THREE.PDBLoader();
// const SVGLoader = new THREE.SVGLoader();
// const TGALoader = new THREE.TGALoader();

// Other.
var TextureLoader = new THREE.TextureLoader();
var FontLoader = new THREE.FontLoader();
var XHRLoader = new THREE.XHRLoader();
var AudioLoader = new THREE.AudioLoader();
var ImageLoader = new THREE.ImageLoader();
var MaterialLoader = new THREE.MaterialLoader();
// const MTLLoader = new THREE.MTLLoader();

exports.JSONLoader = JSONLoader;
exports.BufferGeometryLoader = BufferGeometryLoader;
exports.ObjectLoader = ObjectLoader;
exports.TextureLoader = TextureLoader;
exports.FontLoader = FontLoader;
exports.XHRLoader = XHRLoader;
exports.AudioLoader = AudioLoader;
exports.ImageLoader = ImageLoader;
exports.MaterialLoader = MaterialLoader;
//# sourceMappingURL=loaders.js.map
