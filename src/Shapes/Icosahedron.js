/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Icosahderon = class Icosahedron extends WHS.Shape {

	constructor( params ) {

		super( params, "icosahedron" );

		api.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.IcosahedronGeometry(

                params.geometry.radius,
                params.geometry.detail

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Icosahedron = function( params ) {
	return ( new WHS.Icosahderon(  params ) ).addTo( this );
}
