/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.HemisphereLight = class HemisphereLight extends WHS.Light {

	constructor( params ) {

		super( params, "hemispherelight" );

		this.mesh = new THREE.HemisphereLight(
            params.light.skyColor,
            params.light.groundColor,
            params.light.intensity
        );

        super.build();
        super.buildShadow();

	}

}

WHS.World.prototype.HemisphereLight = function( params ) {
	return ( new WHS.HemisphereLight(  params ) ).addTo( this );
}
