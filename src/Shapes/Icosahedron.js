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
            _scope.mesh = new mesh(
                new THREE.IcosahedronGeometry(

                    params.geometry.radius,
                    params.geometry.detail

                ),

                material,
                params.mass
            );

            resolve();
        });

    }

}

WHS.World.prototype.Icosahedron = function( params ) {
    let object = new WHS.Icosahderon( params );

    object.addTo( this );

    return object;
}
