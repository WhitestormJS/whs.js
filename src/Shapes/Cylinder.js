/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS cylinder shape.
 *
 * @extends WHS.Shape
 */

WHS.Cylinder = class Cylinder extends WHS.Shape {
    /**
     * Create a cylinder.
     *
     * @param {Object} params - Cylinder options
     * @param {Object} params.geometry - Cylinder geometry
     * @param {Number} params.geometry.radiusTop - The cylinder's top radius
     * @param {Number} params.geometry.radiusBottom - The cylinder's bottom radius
     * @param {Number} params.geometry.height - The cylinder's height
     * @param {Number} params.geometry.radiusSegments - The number of radius segments the cylinder has
     * @param {Material} params.material - The cylinder's material
     * @param {Number} params.mass - The cylinder's mass
     */
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
