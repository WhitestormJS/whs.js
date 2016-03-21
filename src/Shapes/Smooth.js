/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS smooth
 *
 * @extends WHS.Shape
 */

WHS.Smooth = class Smooth extends WHS.Shape {

    /**
     * Smooths things
     *
     * @param {Object} params - Smooth options
     * @param {Object} params.geometry - Smooth geometry options
     * @param {Number} params.geometry.width - Smooth width
     * @param {Number} params.geometry.height - Smooth height
     * @param {Material} params.material - Smooth material
     */

	constructor( params ) {

		super( params, "smooth" );

        api.extend(params.geometry, {

            width: 10,
            height: 10

        });

        this.mesh = new Physijs.BoxMesh(
            new THREE.BoxGeometry(

                params.geometry.width,
                1,
                params.geometry.height

            ),
            super._initMaterial(params.material),
            0
        );

        super.build();

	}

}

WHS.World.prototype.Smooth = function( params ) {
	return ( new WHS.Smooth(  params ) ).addTo( this );
}
