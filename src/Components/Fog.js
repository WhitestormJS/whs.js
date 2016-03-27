/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Fog = class Fog {

	constructor( params ) {

        if (typeof params !== "object") params = {};

        api.extend(params, {

            hex: 0x000000,
            near: 1,
            far: 1000

        });

        this.fog = new THREE.Fog( params.hex, params.near, params.far);

	}

    addTo( root ) {
        
        root.scene.fog = this.fog;

    }

}

WHS.World.prototype.Fog = function( params ) {
	return ( new WHS.Fog(  params ) ).addTo( this );
}
