/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Cube = class Cube extends WHS.Shape {

	constructor( params ) {

		super( params, "cube" );

		api.extend(params.geometry, {

            width: 1,
            height: 1,
            depth: 1

        });

		this.mesh = new Physijs.BoxMesh( 
            new THREE.BoxGeometry(

                params.geometry.width,
                params.geometry.height,
                params.geometry.depth

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Cube = function( params ) {
	return ( new WHS.Cube(  params ) ).addTo( this );
}
