/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.AmbientLight = class AmbientLight extends WHS.Light {

	constructor( params ) {

		super( params, "ambientlight" );

		this.mesh = new THREE.AmbientLight(
            params.light.color
        );

        super.build();
        super.buildShadow();

	}

}

WHS.init.prototype.AmbientLight = function( params ) {
	return ( new WHS.AmbientLight(  params ) ).addTo( this );
}
