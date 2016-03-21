/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS point light.
 *
 * @extends WHS.Light
 */
WHS.PointLight = class PointLight extends WHS.Light {
    /**
     * Point light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     * @param {Object} params.light.distance - Light distance.
     * @param {Object} params.light.decay - How much the light dims
     */
	constructor( params ) {

		super( params, "pointlight" );

	this.mesh = new THREE.PointLight(
                params.light.color,
                params.light.intensity,
                params.light.distance,
                params.light.decay
        );

        super.build();
        super.buildShadow();

	}

}

WHS.World.prototype.PointLight = function( params ) {
	return ( new WHS.PointLight(  params ) ).addTo( this );
}
