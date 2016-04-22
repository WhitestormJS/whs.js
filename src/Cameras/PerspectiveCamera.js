/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS directional light.
 *
 * @extends WHS.Light
 */
WHS.PerspectiveCamera = class PerspectiveCamera extends WHS.Camera {
	/**
     * Directional light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     */
	constructor( params = {} ) {

		super( params, "perspectivecamera" );

		this.camera = new THREE.PerspectiveCamera(
            params.camera.fov,
            params.camera.aspect,
            params.camera.near,
            params.camera.far
        );

        super.build();

	}

}

WHS.World.prototype.PerspectiveCamera = function( params ) {
    let camera = new WHS.PerspectiveCamera( params );

    camera.addTo( this );

    return camera;
}
