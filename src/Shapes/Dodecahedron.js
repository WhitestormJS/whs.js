/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS dodecahedron shape
 *
 * @extends WHS.Shape
 */

WHS.Dodecahedron = class Dodecahedron extends WHS.Shape {

    /**
     * Create a dodecahedron
     *
     * @param {Object} params - The dodecahedron's options
     * @param {Object} params.geometry - The dodecahedron's geometry
     * @param {Number} params.geometry.radius - The dodecahedron's radius
     * @param {Number} params.geometry.detail - The dodecahedron's detail
     * @param {Material} params.material - The dodecahedron's material
     * @param {Number} params.mass - The dodecahedron's mass
     */
	constructor( params ) {

		super( params, "dodecahedron" );

		api.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

		this.mesh = new Physijs.ConvexMesh(
            new THREE.DodecahedronGeometry(

                params.geometry.radius,
                params.geometry.detail

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.build();

	}

}

WHS.init.prototype.Dodecahedron = function( params ) {
	return ( new WHS.Dodecahedron(  params ) ).addTo( this );
}
