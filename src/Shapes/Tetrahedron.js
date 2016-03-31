/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS tetrahedron shape
 *
 * @extends WHS.Shape
 */

WHS.Tetrahedron = class Tetrahedron extends WHS.Shape {
    /**
     * Creates a tetrahedron
     *
     * @param {Object} params - Tetrahedron options
     * @param {Object} params.geometry - Tetrahedron geometry options
     * @param {Number} params.geometry.radius - Tetrahedron radius
     * @param {Number} params.geometry.detail - Tetrahedron detail
     * @param {Material} params.material - Tetrahedron material
     * @param {Number} params.mass - Tetrahedron mass
     */
	constructor( params = {} ) {

		super( params, "tetrahedron" );

		api.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

		this.mesh = new Physijs.ConvexMesh(
            new THREE.TetrahedronGeometry(

                params.geometry.radius,
                params.geometry.detail

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.build();

	}

}

WHS.World.prototype.Tetrahedron = function( params ) {
	return ( new WHS.Tetrahedron(  params ) ).addTo( this );
}
