/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Ring = class Ring extends WHS.Shape {

	constructor( params ) {

		super( params, "ring" );

		api.extend(params.geometry, {

            innerRadius: 0,
            outerRadius: 50,
            thetaSegments: 8,
            phiSegments: 8,
            thetaStart: 0,
            thetaLength: Math.PI * 2

        });

		this.mesh = new THREE.Mesh( 
            new THREE.RingGeometry(

                params.geometry.innerRadius,
                params.geometry.outerRadius,
                params.geometry.thetaSegments,
                params.geometry.phiSegments,
                params.geometry.thetaStart,
                params.geometry.thetaLength

            ), 

            super._initMaterial(params.material)
        );

        super.build("onlyvis");

	}

}

WHS.World.prototype.Ring = function( params ) {
	return ( new WHS.Ring(  params ) ).addTo( this );
}
