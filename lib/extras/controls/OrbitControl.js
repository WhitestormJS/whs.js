"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Orbit controld for scene.
 *
 * @param {Object} object - Object followed by camera.
 */
WHS.World.prototype.OrbitControls = function (object) {

	this.controls = new THREE.OrbitControls(this.getCamera().getNative(), this.getRenderer().domElement);

	if (object) {

		if (object._whsobject) {

			var _target = object ? object.mesh.position : new THREE.Vector3(0, 0, 0);

			this.controls.target = _target;
		} else if ((typeof object === "undefined" ? "undefined" : (0, _typeof3.default)(object)) == "object") this.controls.target.copy(target);else console.error("Object must be a THREE.JS vector! @OrbitControls");
	}
};
//# sourceMappingURL=OrbitControl.js.map
