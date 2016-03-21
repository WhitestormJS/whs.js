/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS octahedron shape
 *
 * @extends WHS.Shape
 */

WHS.Octahedron = class Octahedron extends WHS.Shape {

    /**
     * Creates an octahedron
     *
     * @param {Object} params - Octahedron options
     * @param {Object} params.geometry - Octahedron geometry options
     * @param {Number} params.geometry.radius - Octahedron radius
     * @param {Number} params.geometry.detail - Octahedron detail
     * @param {Material} params.material - Octahedron material
     * @param {Number} params.mass - Octahedron mass
     */

	constructor( params ) {

		super( params, "octahedron" );

		api.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

		this.mesh = new Physijs.ConvexMesh(
            new THREE.OctahedronGeometry(

                params.geometry.radius,
                params.geometry.detail

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.build();

	}

}

WHS.World.prototype.Octahedron = function( params ) {
	return ( new WHS.Octahedron(  params ) ).addTo( this );
}
