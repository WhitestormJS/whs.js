/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Three.js fog effect.
 *
 */
WHS.Fog = class Fog {
    /**
     * Creates fog.
     *
     * @param {Object} params - Optional fog parameters.
     * @param {Number} params.hex - Fog hex value
	 * @param {Number} params.near - Fog near value
	 * @param {Number} params.far - Fog far value
     */
	constructor( params = {} ) {

        WHS.API.extend(params, {

            hex: 0x000000,
            near: 1,
            far: 1000

        });

        this.fog = new THREE.Fog( params.hex, params.near, params.far);

        this.type = "fog";

	}

    /**
     * Add fog to scene.
     */
    addTo( root ) {

        root.scene.fog = this.fog;

    }

}

WHS.World.prototype.Fog = function( params ) {
    let object = new WHS.Fog( params );

    object.addTo( this );

    return object;
}
