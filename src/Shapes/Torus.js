/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Torus = class Torus extends WHS.Shape {

	constructor( params ) {

		super( params, "torus" );

		api.extend(params.geometry, {

            radius: 100,
            tube: 40,
            radialSegments: 8,
            tubularSegments: 6,
            arc: Math.PI * 2,

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.TorusGeometry(

                params.geometry.radius,
                params.geometry.tube,
                params.geometry.radialSegments,
                params.geometry.tubularSegments,
                params.geometry.arc

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Torus = function( params ) {
	return ( new WHS.Torus(  params ) ).addTo( this );
}
