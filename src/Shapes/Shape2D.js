/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS 2D shape
 *
 * @extends WHS.Shape
 */

WHS.Shape2D = class Shape2D extends WHS.Shape {
    /**
     * Creates a 2D shape
     *
     * @param {Object} params - Shape options
     * @param {Object} params.geometry - Shape geometry options
     * @param {Array} params.geometry.shapes - Shapes
     * @param {Material} params.material - Shape material
     */
	constructor( params = {} ) {

		super( params, "shape2D" );

		WHS.API.extend(params.geometry, {

            shapes: []

        });

		this.mesh = new THREE.Mesh(
            new THREE.ShapeGeometry(

                params.geometry.shapes

            ),

            super._initMaterial(params.material)
        );

        super.build("onlyvis");

	}

}

WHS.World.prototype.Shape2D = function( params ) {
    let object = new WHS.Shape2D( params );

    object.addTo( this );

    return object;
}
