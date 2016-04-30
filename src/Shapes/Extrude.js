/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS shape extrude
 *
 * @extends WHS.Shape
 */
WHS.Extrude = class Extrude extends WHS.Shape {
    /**
     * Extrude a shape
     *
     * @param {Object} params - General options
     * @param {Object} params.geometry - Geometry options
     * @param {Array} params.geometry.shapes - Shapes to extrude
     * @param {Object} params.geometry.options - Options concerning shapes to extrude
     * @param {Material} params.material - Material
     * @param {Number} params.mass - Mass
     */
	constructor( params = {} ) {

		super( params, "extrude" );

		WHS.API.extend(params.geometry, {

            shapes: [],
            options: {}

        });

        this.build( params );

        super.wrap();

	}

    build( params = {} ) {

        let _scope = this,
            mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
            material = super._initMaterial(params.material);

        return new Promise( (resolve, reject) => {
            _scope.setNative( new mesh(
                new THREE.ExtrudeGeometry(

                    params.geometry.shapes,
                    params.geometry.options

                ),

                material,
                params.mass
            ) );

            resolve();
        });

    }

    /**
     * Clone extrude.
     */
    clone() {

        return new WHS.Extrude( this.getParams(), this._type ).copy( this );

    }

}

WHS.World.prototype.Extrude = function( params ) {
    let object = new WHS.Extrude( params );

    object.addTo( this );

    return object;
}
