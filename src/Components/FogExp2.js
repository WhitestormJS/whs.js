/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.FogExp2 = class FogExp2 {

	constructor( params ) {

        if (typeof params !== "object") params = {};

        api.extend(params, {

            hex: 0x000000,
            density: 0.00025

        });

        this.fog = new THREE.FogExp2( params.hex, params.density);

	}

    addTo( root ) {
        
        root.scene.fog = this.fog;

    }

}

WHS.World.prototype.FogExp2 = function( params ) {
	return ( new WHS.FogExp2(  params ) ).addTo( this );
}
