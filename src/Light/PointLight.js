/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.PointLight = class PointLight extends WHS.Light {

	constructor( params ) {

		super( params, "pointlight" );

		this.mesh = new THREE.PointLight(
            params.light.color,
            params.light.intensity,
            params.light.distance,
            params.light.decay
        );

        super.build();
        super.buildShadow();

	}

}

WHS.init.prototype.PointLight = function( params ) {
	return ( new WHS.PointLight(  params ) ).addTo( this );
}
