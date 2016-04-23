/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS lathe Shape
 *
 * @extends WHS.Shape
 */

WHS.Lathe = class Lathe extends WHS.Shape {
    /**
     * Create a lathe
     *
     * @param {Object} params - Lathe options
     * @param {Object} params.geometry - Lathe geometry options
     * @param {Array} params.geometry.points - Lathe points
     * @param {Material} params.material - Lathe material
     * @param {Number} params.mass - Lathe mass
     */
	constructor( params = {} ) {

		super( params, "lathe" );

		WHS.API.extend(params.geometry, {

            points: []

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
                new THREE.LatheGeometry(

                    params.geometry.points

                ),

                material,
                params.mass
            );

            resolve();
        });

    }

}

WHS.World.prototype.Lathe = function( params ) {
    let object = new WHS.Lathe( params );

    object.addTo( this );

    return object;
}
