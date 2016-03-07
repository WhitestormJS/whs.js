/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Polyhedron = class Polyhedron extends WHS.Shape {

	constructor( params ) {

		super( params, "polyhedron" );

		api.extend(params.geometry, {

            verticesOfCube: this.verticesOfCube,
            indicesOfFaces: this.indicesOfFaces,
            radius: 6,
            detail: 2

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

    get verticesOfCube() {

        return [
            -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
            -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
        ];

    }

    get indicesOfFaces() {

        return [
            2,1,0,    0,3,2,
            0,4,7,    7,3,0,
            0,1,5,    5,4,0,
            1,2,6,    6,5,1,
            2,3,7,    7,6,2,
            4,5,6,    6,7,4
        ];

    }

}

WHS.init.prototype.Polyhedron = function( params ) {
	return ( new WHS.Polyhedron(  params ) ).addTo( this );
}
