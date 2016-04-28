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
	constructor( params = {} ) {

		super( params, "octahedron" );

		WHS.API.extend(params.geometry, {

            radius: 1,
            detail: 0

        });

        this.build( params );

        super.wrap();

	}

    build( params = {} ) {

        let _scope = this,
            mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
            material = super._initMaterial(params.material);

        return new Promise( (resolve, reject) => {
            _scope.setNative( new mesh(
                new THREE.OctahedronGeometry(

                    params.geometry.radius,
                    params.geometry.detail

                ),

                material,
                params.mass
            ) );

            resolve();
        });

    }

}

WHS.World.prototype.Octahedron = function( params ) {
    let object = new WHS.Octahedron( params );

    object.addTo( this );

    return object;
}
