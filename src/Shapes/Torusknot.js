/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS torus knot
 *
 * @extends WHS.Shape
 */

WHS.Torusknot = class Torusknot extends WHS.Shape {
    /**
     * Creates a torus knot
     *
     * @param {Object} params - Knot options
     * @param {Object} params.geometry - Knot geometry options
     * @param {Number} params.geometry.radius - Knot radius
     * @param {Number} params.geometry.tube - Knot tube size
     * @param {Number} params.geometry.radialSegments - Amount of radial segments
     * @param {Number} params.geometry.tubularSegments - Amount of tubular segments
     * @param {Number} params.geometry.p - P
     * @param {Number} params.geometry.q - Q
     * @param {Number} params.geometry.heightScale - Knot height scale
     */
	constructor( params = {} ) {

		super( params, "Torusknot" );

		WHS.API.extend(params.geometry, {

            radius: 100,
            tube: 40,
            radialSegments: 64,
            tubularSegments: 8,
            p: 2,
            q: 3,
            heightScale: 1

        });

        let mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh;

		this.mesh = new mesh(
            new THREE.TorusKnotGeometry(

                params.geometry.radius,
                params.geometry.tube,
                params.geometry.radialSegments,
                params.geometry.tubularSegments,
                params.geometry.p,
                params.geometry.q,
                params.geometry.heightScale

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.wrap();

	}

}

WHS.World.prototype.Torusknot = function( params ) {
    let object = new WHS.Torusknot( params );

    object.addTo( this );

    return object;
}
