/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Sphere = class Sphere extends WHS.Shape {

	constructor( params ) {

		super( params, "sphere" );

		api.extend(params.geometry, {

            radius: 1,
            segmentA: 32,
            segmentB: 32

        });

		this.mesh = new Physijs.SphereMesh(
			new THREE.SphereGeometry(

	            params.geometry.radius,
	            params.geometry.segmentA,
	            params.geometry.segmentB

	        ), 

			super._initMaterial(params.material), 
			params.mass
		);

        super.build();

	}

}

WHS.init.prototype.Sphere = function( params ) {
	return ( new WHS.Sphere(  params ) ).addTo( this );
}
