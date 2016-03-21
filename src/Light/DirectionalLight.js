/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.DirectionalLight = class DirectionalLight extends WHS.Light {

	constructor( params ) {

		super( params, "directionallight" );

		this.mesh = new THREE.DirectionalLight(
            params.light.color,
            params.light.intensity
        );

        super.build();
        super.buildShadow();

	}

}

WHS.World.prototype.DirectionalLight = function( params ) {
	return ( new WHS.DirectionalLight(  params ) ).addTo( this );
}
