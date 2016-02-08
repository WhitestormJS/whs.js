/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Lathe = class Lathe extends WHS.Shape {

	constructor( params ) {

		super( params, "lathe" );

		api.extend(params.geometry, {

            points: []

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.LatheGeometry(

                params.geometry.points

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Lathe = function( params ) {
	return ( new WHS.Lathe(  params ) ).addTo( this );
}
