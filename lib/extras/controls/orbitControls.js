'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.OrbitControls = OrbitControls;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _threeOrbitControls = require('three-orbit-controls');

var _threeOrbitControls2 = _interopRequireDefault(_threeOrbitControls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OrbitControls(object) {
  var controls = new _threeOrbitControls2.default(this.getCamera().getNative(), this.getRenderer().domElement);

  if (object && object.__whsobject) {
    var _target = object ? object.mesh.position : new THREE.Vector3(0, 0, 0);

    controls.target = _target;
  } else if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object') controls.target.copy(target);else console.error('Object must be a THREE.JS vector! @OrbitControls');

  return controls;
}
//# sourceMappingURL=orbitControls.js.map
