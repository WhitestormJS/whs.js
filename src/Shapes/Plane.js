/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS plane shape
 *
 * @extends WHS.Shape
 */

WHS.Plane = class Plane extends WHS.Shape {
    /**
     * Creates a plane.
     *
     * @param {Object} params - Plane options
     * @param {Object} params.geometry - Plane geometry options
     * @param {Number} params.geometry.width - Plane width
     * @param {Number} params.geometry.height - Plane height
     * @param {Number} params.geometry.segments - Plane segments
     * @param {Material} params.material - Plane material
     * @param {Number} params.mass - Plane mass
     */
	constructor( params = {} ) {

		super( params, "plane" );

		WHS.API.extend(params.geometry, {

            width: 10,
            height: 10,
            segments: 32

        });

        this.build( params );

        super.wrap();

	}

    build( params = {} ) {

        let _scope = this,
            mesh = this.physics ? Physijs.PlaneMesh : THREE.Mesh,
            material = super._initMaterial(params.material);

        return new Promise( (resolve, reject) => {
            _scope.setNative( new mesh(
                new THREE.PlaneGeometry(

                    params.geometry.width,
                    params.geometry.height,
                    params.geometry.segments

                ),

                material,
                params.mass
            ) );

            resolve();
        });

    }

}

WHS.World.prototype.Plane = function( params ) {
    let object = new WHS.Plane( params );

    object.addTo( this );

    return object;
}
