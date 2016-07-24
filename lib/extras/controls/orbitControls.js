'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orbitControls = orbitControls;

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _threeOrbitControls = require('three-orbit-controls');

var _threeOrbitControls2 = _interopRequireDefault(_threeOrbitControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ThreeOrbitControls = (0, _threeOrbitControls2.default)(THREE);

function orbitControls(object) {
  return function (world) {
    var controls = new ThreeOrbitControls(world.getCamera().getNative(), world.getRenderer().domElement);

    if (object && object.__whsobject) {
      var target = object ? object.mesh.position : new THREE.Vector3(0, 0, 0);

      controls.target = target;
    } else if (object instanceof THREE.Vector3) controls.target.copy(object);

    return controls;
  };
}
//# sourceMappingURL=orbitControls.js.map
