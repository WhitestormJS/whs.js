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
	constructor( params = {} ) {

		super( params, "dodecahedron" );

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
                new THREE.DodecahedronGeometry(

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

WHS.World.prototype.Dodecahedron = function( params ) {
    let object = new WHS.Dodecahedron( params );

    object.addTo( this );

    return object;
}
