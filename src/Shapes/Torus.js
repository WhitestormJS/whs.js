/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS torus shape
 *
 * @extends WHS.Shape
 */

WHS.Torus = class Torus extends WHS.Shape {
    /**
     * Creates a torus
     *
     * @param {Object} params - Torus options
     * @param {Object} params.geometry - Torus geometry options
     * @param {Number} params.geometry.radius - Torus radius
     * @param {Number} params.geometry.tube - Torus tube size
     * @param {Number} params.geometry.radialSegments - Amount of radial segments
     * @param {Number} params.geometry.tubularSegments - Amount of tubular segments
     * @param {Number} params.geometry.arc - Torus arc
     * @param {Material} params.material - Torus material
     * @param {Number} params.mass - Torus mass
     */
	constructor( params = {} ) {

		super( params, "torus" );

		WHS.API.extend(params.geometry, {

            radius: 100,
            tube: 40,
            radialSegments: 8,
            tubularSegments: 6,
            arc: Math.PI * 2,

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
                new THREE.TorusGeometry(

                    params.geometry.radius,
                    params.geometry.tube,
                    params.geometry.radialSegments,
                    params.geometry.tubularSegments,
                    params.geometry.arc

                ),

                material,
                params.mass
            );

            resolve();
        });

    }

}

WHS.World.prototype.Torus = function( params ) {
    let object = new WHS.Torus( params );

    object.addTo( this );

    return object;
}
