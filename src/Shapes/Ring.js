/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS ring shape
 *
 * @extends WHS.Shape
 */

WHS.Ring = class Ring extends WHS.Shape {
    /**
     * Creates a ring.
     *
     * @param {Object} params - Ring options
     * @param {Object} params.geometry - Ring geometry options
     * @param {Number} params.geometry.innerRadius - Ring inner radius
     * @param {Number} params.geometry.outerRadius - Ring outer radius
     * @param {Number} params.geometry.thetaSegments - Ring theta segments
     * @param {Number} params.geometry.phiSegments - Ring phi segments
     * @param {Number} params.geometry.thetaStart - Ring theta start
     * @param {Number} params.geometry.thetaLength - Ring theta length
     * @param {Material} params.material - Ring material
     * @param {Number} params.mass - Ring mass
     */
	constructor( params = {} ) {

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
