'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFont = exports.loadTexture = exports.loadJson = undefined;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadJson = new _three2.default.JSONLoader().load;
var loadTexture = new _three2.default.TextureLoader().load;
var loadFont = new _three2.default.FontLoader().load;

exports.loadJson = loadJson;
exports.loadTexture = loadTexture;
exports.loadFont = loadFont;
//# sourceMappingURL=loader.js.map
