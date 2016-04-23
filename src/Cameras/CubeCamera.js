/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS cube camera.
 *
 * @extends WHS.Camera
 */
WHS.CubeCamera = class CubeCamera extends WHS.Camera {
	/**
     * Directional light.
     *
     * @param {Object} params.camera.near - Near distance from camera position.
     * @param {Object} params.camera.far - Far distance from camera position.
     * @param {Object} params.camera.cubeResolution - Sets the width of the cube.
     */
	constructor( params = {} ) {

		super( params, "cubecamera" );

		this.camera = new THREE.CubeCamera(
            params.camera.near,
            params.camera.far,
            params.camera.cubeResolution
        );

        super.wrap();

	}

}

WHS.World.prototype.CubeCamera = function( params ) {
    let camera = new WHS.CubeCamera( params );

    camera.addTo( this );

    return camera;
}
