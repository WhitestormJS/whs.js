/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Tube = class Tube extends WHS.Shape {

	constructor( params ) {

		super( params, "tube" );

		api.extend(params.geometry, {

            path: options.geometryOptions.path ? new this.CustomSinCurve(100) : false,
            segments: 20,
            radius: 2,
            radiusSegments: 8,
            closed: false,

        });

		this.mesh = new Physijs.ConvexMesh( 
            new THREE.TubeGeometry(

                params.geometry.path,
                params.geometry.segments,
                params.geometry.radius,
                params.geometry.radiusSegments,
                params.geometry.closed

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

    get CustomSinCurve() {

        return THREE.Curve.create(

            function(scale) { //custom curve constructor
                this.scale = scale || 1;
            },

            function(t) { //getPoint: t is between 0-1
                var tx = t * 3 - 1.5,
                    ty = Math.sin(2 * Math.PI * t),
                    tz = 0;

                return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
            }

        );

    }

}

WHS.init.prototype.Tube = function( params ) {
	return ( new WHS.Tube(  params ) ).addTo( this );
}
