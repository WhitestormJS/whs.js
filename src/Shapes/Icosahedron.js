/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS icosahedron shape.
 *
 * @extends WHS.Shape
 */

WHS.Icosahderon = class Icosahedron extends WHS.Shape {
    /**
     * Create an icosahedron
     *
     * @param {Object} params - Icosahedron options
     * @param {Object} params.geometry - Icosahedron geometry options
     * @param {Number} params.geometry.radius - Icosahedron radius
     * @param {Number} params.geometry.detail - Icosahedron detail
     * @param {Material} params.material - Icosahedron material
     * @param {Number} params.mass - Icosahedron mass
     */
	constructor( params = {} ) {

		super( params, "icosahedron" );

		api.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

		this.mesh = new Physijs.ConvexMesh(
            new THREE.IcosahedronGeometry(

                params.geometry.radius,
                params.geometry.detail

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.build();

	}

}

WHS.World.prototype.Icosahedron = function( params ) {
	return ( new WHS.Icosahderon(  params ) ).addTo( this );
}
