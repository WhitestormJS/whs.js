/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Extrude = class Extrude extends WHS.Shape {

	constructor( params ) {

		super( params, "extrude" );

		api.extend(params.geometry, {

            shapes: [],
            options: {}

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.ExtrudeGeometry(

                params.geometry.shapes,
                params.geometry.options

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Extrude = function( params ) {
	return ( new WHS.Extrude(  params ) ).addTo( this );
}
