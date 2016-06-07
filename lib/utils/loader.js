'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFont = exports.loadTexture = exports.loadJson = undefined;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var loadJson = new THREE.JSONLoader().load;
var loadTexture = new THREE.TextureLoader().load;
var loadFont = new THREE.FontLoader().load;

exports.loadJson = loadJson;
exports.loadTexture = loadTexture;
exports.loadFont = loadFont;
//# sourceMappingURL=loader.js.map
