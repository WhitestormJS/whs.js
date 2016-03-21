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

	constructor( params ) {

		super( params, "parametric" );

		api.extend(params.geometry, {

            func: function() {},
            slices: 10,
            stacks: 10

        });

		this.mesh = new Physijs.ConcaveMesh(
            new THREE.ParametricGeometry(

                params.geometry.func,
                params.geometry.slices,
                params.geometry.stacks

            ),

            super._initMaterial(params.material),
            params.mass
        );

        super.build();

	}

}

WHS.World.prototype.Parametric = function( params ) {
	return ( new WHS.Parametric(  params ) ).addTo( this );
}
