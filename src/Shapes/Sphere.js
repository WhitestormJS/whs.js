/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS sphere shape
 *
 * @extends WHS.Shape
 */

WHS.Sphere = class Sphere extends WHS.Shape {
    /**
     * Creates a sphere.
     *
     * @param {Object} params - Sphere options
     * @param {Object} params.geometry - Sphere geometry options
     * @param {Number} params.geometry.radius - Sphere radius
     * @param {Number} params.geometry.segmentA - Sphere segment A count
     * @param {Number} params.geometry.segmentB - Sphere segment B count
     * @param {Material} params.material - Sphere material
     * @param {Number} params.mass - Sphere mass
     */
	constructor( params = {} ) {

		super( params, "sphere" );

		api.extend(params.geometry, {

            radius: 1,
            segmentA: 32,
            segmentB: 32

        });

		this.mesh = new Physijs.SphereMesh(
			new THREE.SphereGeometry(

	            params.geometry.radius,
	            params.geometry.segmentA,
	            params.geometry.segmentB

	        ),

			super._initMaterial(params.material),
			params.mass
		);

        super.build();

	}

}

WHS.World.prototype.Sphere = function( params ) {
	return ( new WHS.Sphere(  params ) ).addTo( this );
}
