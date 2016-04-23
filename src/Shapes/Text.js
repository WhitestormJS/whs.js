/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS text
 *
 * @extends WHS.Shape
 */

WHS.Text = class Text extends WHS.Shape {
    /**
     * Creates 3D text
     *
     * @param {Object} params - Text options
     * @param {Object} params.geometry - Text geometry options
     * @param {String} params.geometry.text - Text to display
     * @param {Number} params.geometry.parameters.size - Text size
     * @param {Number} params.geometry.parameters.height - Text height
     * @param {Number} params.geometry.parameters.curveSegments - Text curve segments
     * @param {Font} params.geometry.parameters.font - Text font
     * @param {Boolean} params.geometry.parameters.bevelEnabled - Whether or not to bevel text
     * @param {Number} params.geometry.parameters.bevelThickness - Text bevel thickness
     * @param {Number} params.geometry.parameters.bevelSize - Text bevel size
     * @param {Material} params.material - Text material
     * @param {Number} params.mass - Text mass
     */
	constructor( params = {} ) {

		super( params, "text" );

		WHS.API.extend(params.geometry, {

            text: "Hello World!",

            parameters: {
                size: 12,
                height: 50,
                curveSegments: 12,
                font: new THREE.Font(),
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8
            }

        });

        var scope = this;

        super.wait(
            new Promise(function(resolve, reject) {

                WHS.API.loadFont(params.geometry.parameters.font, function( font ) {

                    params.geometry.parameters.font = font;

                    let mesh = scope.physics ? Physijs.ConcaveMesh : THREE.Mesh;

            		scope.mesh = new mesh(
                        new THREE.TextGeometry(

                            params.geometry.text,
                            params.geometry.parameters

                        ),

                        WHS.API.loadMaterial(params.material)._material,
                        params.mass
                    );

                    resolve();

                });

            })
        );

        super.wrap("wait");

	}

}

WHS.World.prototype.Text = function( params ) {
    let object = new WHS.Text(  params );

    object.addTo( this, "wait" );

    return object;
}
