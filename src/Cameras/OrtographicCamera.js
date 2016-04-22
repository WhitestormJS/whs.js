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
WHS.OrtographicCamera = class OrtographicCamera extends WHS.Camera {
	/**
     * Directional light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
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
