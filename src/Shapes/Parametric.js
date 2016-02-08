/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Parametric = class Parametric extends WHS.Shape {

	constructor( params ) {

		super( params, "parametric" );

		api.extend(params.geometry, {

            func: function() {},
            slices: 10,
            stacks: 10 

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.ParametricGeometry(

                params.geometry.func,
                params.geometry.slices,
                params.geometry.stacks

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Parametric = function( params ) {
	return ( new WHS.Parametric(  params ) ).addTo( this );
}
