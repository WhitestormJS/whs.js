/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Shape2D = class Shape2D extends WHS.Shape {

	constructor( params ) {

		super( params, "shape2D" );

		api.extend(params.geometry, {

            shapes: []

        });

		this.mesh = new THREE.Mesh( 
            new THREE.ShapeGeometry(

                params.geometry.shapes

            ), 

            super._initMaterial(params.material)
        );

        super.build("onlyvis");

	}

}

WHS.World.prototype.Shape2D = function( params ) {
	return ( new WHS.Shape2D(  params ) ).addTo( this );
}
