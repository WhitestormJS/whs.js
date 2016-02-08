/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.SpotLight = class SpotLight extends WHS.Light {

	constructor( params ) {

		super( params, "spotlight" );

		this.mesh = new THREE.SpotLight(
            params.light.color,
            params.light.intensity,
            params.light.distance,
            params.light.angle
        );

        super.build();
        super.buildShadow();

	}

}

WHS.init.prototype.SpotLight = function( params ) {
	return ( new WHS.SpotLight(  params ) ).addTo( this );
}
