/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Three.js FogExp2 effect.
 */
WHS.FogExp2 = class FogExp2 {
    /**
     * Create fog (exp2).
     *
     * @param {Object} params - Optional fog parameters.
	 * @param {Number} params.hex - Fog hex value
	 * @param {Number} params.density - Fog density
     */
	constructor( params = {} ) {

        WHS.API.extend(params, {

            hex: 0x000000,
            density: 0.00025

        });

        this.fog = new THREE.FogExp2( params.hex, params.density);

        this.type = "fogexp2";

	}

    /**
     * Add fog to scene.
     */
    addTo( root ) {

        root.scene.fog = this.fog;

    }

}

WHS.World.prototype.FogExp2 = function( params ) {
    let object = new WHS.FogExp2( params );

    object.addTo( this );

    return object;
}
