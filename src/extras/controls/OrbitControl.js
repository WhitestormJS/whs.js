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
WHS.World.prototype.OrbitControls = function( object ) {

	this.controls = new THREE.OrbitControls(
		this.getCamera().getNative(),
		this.getRenderer().domElement
	);

	if ( object ) {

		if ( object._whsobject ) {

			let target = object ? object.mesh.position 
				: new THREE.Vector3( 0, 0, 0 );

			this.controls.target = target;

		}
		else if ( typeof object == "object" )
			this.controls.target.copy(target);
		else
			console.error("Object must be a THREE.JS vector! @OrbitControls");

	}

}
