/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Dodecahedron = class Dodecahedron extends WHS.Shape {

	constructor( params ) {

		super( params, "dodecahedron" );

		api.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.DodecahedronGeometry(

                params.geometry.radius,
                params.geometry.detail

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Dodecahedron = function( params ) {
	return ( new WHS.Dodecahedron(  params ) ).addTo( this );
}
