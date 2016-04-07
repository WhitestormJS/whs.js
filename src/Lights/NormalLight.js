/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS default light.
 *
 * @extends WHS.Light
 */
WHS.NormalLight = class NormalLight extends WHS.Light {
    /**
     * Normal light.
     *
     * @param {Object} params.light.color - Light color.
     */
	constructor( params = {} ) {

		super( params, "normallight" );

		this.mesh = new THREE.Light(
            params.light.color
        );

        super.build();
        super.buildShadow();

	}

}

WHS.World.prototype.NormalLight = function( params ) {
    let object = new WHS.NormalLight( params );

    object.addTo( this );

    return object;
}
