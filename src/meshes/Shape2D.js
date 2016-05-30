WHS.Shape2D = class Shape2D extends WHS.Shape {
    /**
     * Creates a 2D shape
     *
     * @param {Object} params - Shape options
     * @param {Object} params.geometry - Shape geometry options
     * @param {Array} params.geometry.shapes - Shapes
     * @param {Material} params.material - Shape material
     */
	constructor( params = {} ) {

		super( params, "shape2D" );

		WHS.API.extend(params.geometry, {

            shapes: []

        });

        super.build( params )

        super.wrap("onlyvis");

	}

    build( params = {} ) {

        let _scope = this,
            material = super._initMaterial(params.material);

        return new Promise( (resolve, reject) => {
            _scope.setNative( new THREE.Mesh(
                new THREE.ShapeGeometry(

                    params.geometry.shapes

                ),

                material
            ) );

            resolve();
        });

    }

    /**
     * Clone shape2d.
     */
    clone() {

        return new WHS.Shape2D( this.getParams(), this._type ).copy( this );

    }

}

WHS.World.prototype.Shape2D = function( params ) {
    let object = new WHS.Shape2D( params );

    object.addTo( this );

    return object;
}
