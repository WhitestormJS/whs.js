/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS shape extrude
 *
 * @extends WHS.Shape
 */
WHS.Extrude = class Extrude extends WHS.Shape {

    /**
     * Extrude a shape
     *
     * @param {Object} params - General options
     * @param {Object} params.geometry - Geometry options
     * @param {Array} params.geometry.shapes - Shapes to extrude
     * @param {Object} params.geometry.options - Options concerning shapes to extrude
     * @param {Material} params.material - Material
     * @param {Number} params.mass - Mass
     */

	constructor( params ) {

		super( params, "extrude" );

		api.extend(params.geometry, {

            shapes: [],
            options: {}

        });

		this.mesh = new Physijs.ConvexMesh(
            new THREE.ExtrudeGeometry(

                params.geometry.shapes,
                params.geometry.options

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.build();

	}

}

WHS.World.prototype.Extrude = function( params ) {
	return ( new WHS.Extrude(  params ) ).addTo( this );
}
