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
WHS.DirectionalLight = class DirectionalLight extends WHS.Light {
	/**
     * Directional light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     */
	constructor( params = {} ) {

		super( params, "directionallight" );

		this.mesh = new THREE.DirectionalLight(
            params.light.color,
            params.light.intensity
        );

        super.build();
        super.buildShadow();

	}

}

WHS.World.prototype.DirectionalLight = function( params ) {
    let object = new WHS.DirectionalLight( params );

    object.addTo( this );

    return object;
}
