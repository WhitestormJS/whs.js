/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * ORBITCONTROLS.
 *
 * @param {Object} object Description. (OPTIONAL)
 */
WHS.init.prototype.OrbitControls = function(object) {

	this.controls = new THREE.OrbitControls(this._camera, this.renderer.domElement);

	if (object._whsobject) {
		
		var target = object ? object.visible.position : new THREE.Vector3( 0, 0, 0 );
		this.controls.target = target;

	} else if (typeof object == "object")
		this.controls.target.copy(target);
	else
		console.error("Object must be a THREE.JS vector! @OrbitControls");

}
