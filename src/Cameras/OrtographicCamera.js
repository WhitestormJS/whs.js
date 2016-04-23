/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS ortographic camera.
 *
 * @extends WHS.Camera
 */
WHS.OrtographicCamera = class OrtographicCamera extends WHS.Camera {
	/**
     * Ortographic camera.
     *
     * @param {Object} params.camera.left - Left distance.
     * @param {Object} params.camera.right - Right distance.
     * @param {Object} params.camera.top - Top distance.
     * @param {Object} params.camera.bottom - Bottom distance.
     * @param {Object} params.camera.near - Near distance.
     * @param {Object} params.camera.far - Far distance.
     */
	constructor( params = {} ) {

		super( params, "ortographiccamera" );

		this.camera = new THREE.OrtographicCamera(
            params.camera.left,
            params.camera.right,
            params.camera.top,
            params.camera.bottom,
            params.camera.near,
            params.camera.far
        );

        super.build();

	}

}

WHS.World.prototype.OrtographicCamera = function( params ) {
    let camera = new WHS.OrtographicCamera( params );

    camera.addTo( this );

    return camera;
}
