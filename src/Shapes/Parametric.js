/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS parametric
 *
 * @extends WHS.Shape
 */

WHS.Parametric = class Parametric extends WHS.Shape {
    /**
     * Creates a parametric
     *
     * @param {Object} params - Parametric options
     * @param {Object} params.geometry - Parametric geometry options
     * @param {Function} params.func - Parametric function
     * @param {Number} params.slices - Parametric slices
     * @param {Number} params.stacks - Parametric stacks
     * @param {Material} params.material - Parametric material
     * @param {Number} params.mass - Parametric mass
     */
	constructor( params = {} ) {

		super( params, "parametric" );

		WHS.API.extend(params.geometry, {

            func: function() {},
            slices: 10,
            stacks: 10

        });

        let mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh;

		this.mesh = new mesh(
            new THREE.ParametricGeometry(

                params.geometry.func,
                params.geometry.slices,
                params.geometry.stacks

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.wrap();

	}

}

WHS.World.prototype.Parametric = function( params ) {
    let object = new WHS.Parametric( params );

    object.addTo( this );

    return object;
}
