/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS cube shape.
 *
 * @extends WHS.Shape
 */

WHS.Cube = class Cube extends WHS.Shape {
    /**
     * Create a cube.
     *
     * @param {Object} params - Cube options
     * @param {Object} params.geometry - Cube geometry
     * @param {Number} params.geometry.width - Cube width
     * @param {Number} params.geometry.height - Cube height
     * @param {Number} params.geometry.depth - Cube depth
     * @param {Material} params.material - Cube material
     * @param {Number} params.mass - Cube mass
     */
	constructor( params = {} ) {

		super( params, "cube" );

		api.extend( params.geometry, {

            width: 1,
            height: 1,
            depth: 1

        } );

		this.mesh = new Physijs.BoxMesh(
            new THREE.BoxGeometry(

                params.geometry.width,
                params.geometry.height,
                params.geometry.depth

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.build();

	}

}

WHS.World.prototype.Cube = function( params ) {
	return ( new WHS.Cube(  params ) ).addTo( this );
}
