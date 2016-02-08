/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Cylinder = class Cylinder extends WHS.Shape {

	constructor( params ) {

		super( params, "cylinder" );

		api.extend(params.geometry, {

            radiusTop: 1,
            radiusBottom: 1,
            height: 1,
            radiusSegments: 32

        });

		this.mesh = new Physijs.CylinderMesh( 
            new THREE.CylinderGeometry(

                params.geometry.radiusTop,
                params.geometry.radiusBottom,
                params.geometry.height,
                params.geometry.radiusSegments

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Cylinder = function( params ) {
	return ( new WHS.Cylinder(  params ) ).addTo( this );
}
