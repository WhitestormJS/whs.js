/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS box shape.
 *
 * @extends WHS.Shape
 */

WHS.Box = class Box extends WHS.Shape {
    /**
     * Create a box.
     *
     * @param {Object} params - Box options
     * @param {Object} params.geometry - Box geometry
     * @param {Number} params.geometry.width - Box width
     * @param {Number} params.geometry.height - Box height
     * @param {Number} params.geometry.depth - Box depth
     * @param {Material} params.material - Box material
     * @param {Number} params.mass - Box mass
     */
	constructor( params = {} ) {

		super( params, "box" );

		WHS.API.extend( params.geometry, {

            width: 1,
            height: 1,
            depth: 1

        });

        this.build( params );

        super.wrap();

	}

    build( params = {} ) {

        let _scope = this,
            mesh = this.physics ? Physijs.BoxMesh : THREE.Mesh,
            material = super._initMaterial(params.material);

        return new Promise( (resolve, reject) => {
            _scope.mesh = new mesh(
                new THREE.BoxGeometry(

                    params.geometry.width,
                    params.geometry.height,
                    params.geometry.depth

                ),

                material,
                params.mass
            );

            resolve();
        });

    }

}

WHS.World.prototype.Box = function( params ) {
    let object = new WHS.Box( params );

    object.addTo( this );

    return object;
}
