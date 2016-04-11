/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS box shape.
 *
 * @extends WHS.Shape
 */

WHS.Box = class Box extends WHS.Shape {
    /**
     * Create a box.
     *
     * @param {Object} params - Box options
     * @param {Object} params.geometry - Box geometry
     * @param {Number} params.geometry.width - Box width
     * @param {Number} params.geometry.height - Box height
     * @param {Number} params.geometry.depth - Box depth
     * @param {Material} params.material - Box material
     * @param {Number} params.mass - Box mass
     */
	constructor( params = {} ) {

		super( params, "box" );

		WHS.API.extend( params.geometry, {

            width: 1,
            height: 1,
            depth: 1

        });

        let mesh = this.physics ? Physijs.BoxMesh : THREE.Mesh;

		this.mesh = new mesh(
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

WHS.World.prototype.Box = function( params ) {
    let object = new WHS.Box( params );

    object.addTo( this );

    return object;
}
