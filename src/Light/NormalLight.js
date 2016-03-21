/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.NormalLight = class NormalLight extends WHS.Light {

	constructor( params ) {

		super( params, "normallight" );

		this.mesh = new THREE.Light(
            params.light.color
        );

        super.build();
        super.buildShadow();

	}

}

WHS.World.prototype.NormalLight = function( params ) {
	return ( new WHS.NormalLight(  params ) ).addTo( this );
}
