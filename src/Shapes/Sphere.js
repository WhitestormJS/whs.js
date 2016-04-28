/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS sphere shape
 *
 * @extends WHS.Shape
 */

WHS.Sphere = class Sphere extends WHS.Shape {
    /**
     * Creates a sphere.
     *
     * @param {Object} params - Sphere options
     * @param {Object} params.geometry - Sphere geometry options
     * @param {Number} params.geometry.radius - Sphere radius
     * @param {Number} params.geometry.segmentA - Sphere segment A count
     * @param {Number} params.geometry.segmentB - Sphere segment B count
     * @param {Material} params.material - Sphere material
     * @param {Number} params.mass - Sphere mass
     */
	constructor( params = {} ) {

		super( params, "sphere" );

		WHS.API.extend(params.geometry, {

            radius: 1,
            segmentA: 32,
            segmentB: 32

        });

        this.build( params );

        super.wrap();

	}

    build( params = {} ) {

        let _scope = this,
            mesh = this.physics ? Physijs.SphereMesh : THREE.Mesh,
            material = super._initMaterial(params.material);

        return new Promise( (resolve, reject) => {
            _scope.setNative( new mesh(
                new THREE.SphereGeometry(

                    params.geometry.radius,
                    params.geometry.segmentA,
                    params.geometry.segmentB

                ),

                material,
                params.mass
            ) );

            resolve();
        });

    }

}

WHS.World.prototype.Sphere = function( params ) {
    let object = new WHS.Sphere( params );

    object.addTo( this );

    return object;
}
