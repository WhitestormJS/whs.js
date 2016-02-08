/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Octahedron = class Octahedron extends WHS.Shape {

	constructor( params ) {

		super( params, "octahedron" );

		api.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.OctahedronGeometry(

                params.geometry.radius,
                params.geometry.detail

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Octahedron = function( params ) {
	return ( new WHS.Octahedron(  params ) ).addTo( this );
}
