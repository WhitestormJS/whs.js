/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Three.js FogExp2.
 */
WHS.FogExp2 = class FogExp2 {
    /**
     * Fog (exp2) constructing.
     *
     * @param {Object} params - Optional fog parameters.
     */
	constructor( params = {} ) {

        api.extend(params, {

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
	return ( new WHS.FogExp2(  params ) ).addTo( this );
}
