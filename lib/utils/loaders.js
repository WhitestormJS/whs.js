'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaterialLoader = exports.ImageLoader = exports.AudioLoader = exports.XHRLoader = exports.FontLoader = exports.TextureLoader = exports.ObjectLoader = exports.BufferGeometryLoader = exports.OBJLoader = exports.JSONLoader = undefined;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _threeObjLoader = require('three-obj-loader');

var _threeObjLoader2 = _interopRequireDefault(_threeObjLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(0, _threeObjLoader2.default)(THREE);

// Models.
var JSONLoader = new THREE.JSONLoader();
var OBJLoader = new THREE.OBJLoader();
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
exports.OBJLoader = OBJLoader;
exports.BufferGeometryLoader = BufferGeometryLoader;
exports.ObjectLoader = ObjectLoader;
exports.TextureLoader = TextureLoader;
exports.FontLoader = FontLoader;
exports.XHRLoader = XHRLoader;
exports.AudioLoader = AudioLoader;
exports.ImageLoader = ImageLoader;
exports.MaterialLoader = MaterialLoader;
//# sourceMappingURL=loaders.js.map
