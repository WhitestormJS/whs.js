/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS spot light.
 *
 * @extends WHS.Light
 */
WHS.SpotLight = class SpotLight extends WHS.Light {
    /**
     * Point light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     * @param {Object} params.light.distance - Light distance.
     * @param {Object} params.light.angle - Light angle.
     */
	constructor( params ) {

		super( params, "spotlight" );

		this.mesh = new THREE.SpotLight(
            params.light.color,
            params.light.intensity,
            params.light.distance,
            params.light.angle,
            params.light.exponent,
            params.light.decay
        );

        super.build();
        super.buildShadow();

	}

}

WHS.World.prototype.SpotLight = function( params ) {
	return ( new WHS.SpotLight(  params ) ).addTo( this );
}
