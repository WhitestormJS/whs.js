/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.AmbientLight = class AmbientLight extends WHS.Light {

	constructor( params ) {

		super( params, "ambientlight" );

		this.mesh = new THREE.AmbientLight(
            params.light.color,
            params.light.intensity
        );

        super.build();

	}

}

WHS.init.prototype.AmbientLight = function( params ) {
	return ( new WHS.AmbientLight(  params ) ).addTo( this );
}
