/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Plane = class Plane extends WHS.Shape {

	constructor( params ) {

		super( params, "plane" );

		api.extend(params.geometry, {

            width: 10,
            height: 10,
            segments: 32 

        });

		this.mesh = new Physijs.PlaneMesh( 
            new THREE.PlaneGeometry(

                params.geometry.width,
                params.geometry.height,
                params.geometry.segments

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.World.prototype.Plane = function( params ) {
	return ( new WHS.Plane(  params ) ).addTo( this );
}
