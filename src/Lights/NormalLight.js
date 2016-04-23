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

		this.build( params );

        super.wrap();
        super.wrapShadow();

	}

    build( params = {} ) {

        let _scope = this;

        return new Promise( (resolve, reject) => {
            _scope.light = new THREE.Light(
                params.light.color
            );

            resolve();
        });

    }

}

WHS.World.prototype.NormalLight = function( params ) {
    let object = new WHS.NormalLight( params );

    object.addTo( this );

    return object;
}
