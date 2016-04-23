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

		this.light = new THREE.Light(
            params.light.color
        );

        super.wrap();
        super.wrapShadow();

	}

}

WHS.World.prototype.NormalLight = function( params ) {
    let object = new WHS.NormalLight( params );

    object.addTo( this );

    return object;
}
