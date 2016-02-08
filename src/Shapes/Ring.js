/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Ring = class Ring extends WHS.Shape {

	constructor( params ) {

		super( params, "ring" );

		api.extend(params.geometry, {

            innerRadius: 2,
            outerRadius: 5,
            thetaSegments: 30,
            phiSegments: 30,
            thetaStart: 0,
            thetaLength: Math.PI * 2

        });

		this.mesh = new Physijs.ConcaveMesh( 
            new THREE.TorusGeometry(

                params.geometry.innerRadius,
                params.geometry.outerRadius,
                params.geometry.thetaSegments,
                params.geometry.phiSegments,
                params.geometry.thetaStart,
                params.geometry.thetaLength

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Ring = function( params ) {
	return ( new WHS.Ring(  params ) ).addTo( this );
}
