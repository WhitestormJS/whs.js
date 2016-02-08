/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Polyhedron = class Polyhedron extends WHS.Shape {

	constructor( params ) {

		super( params, "polyhedron" );

		api.extend(params.geometry, {

            verticesOfCube: [],
            indicesOfFaces: [],
            radius: 1,
            detail: 1

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.PolyhedronGeometry(

                params.geometry.verticesOfCube,
                params.geometry.indicesOfFaces,
                params.geometry.radius,
                params.geometry.detail

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Polyhedron = function( params ) {
	return ( new WHS.Polyhedron(  params ) ).addTo( this );
}
