WHS.AmbientLight = class AmbientLight extends WHS.Light {
	constructor( params = {} ) {

		super( params, "ambientlight" );

		this.build( params );

        super.wrap("noshadows");

	}

    build( params = {} ) {

        let _scope = this;

        return new Promise( (resolve, reject) => {
            _scope.setNative( new THREE.AmbientLight(
                params.light.color,
                params.light.intensity
            ) );

            resolve();
        });

    }

}

WHS.World.prototype.AmbientLight = function( params ) {
    let object = new WHS.AmbientLight( params );

    object.addTo( this );

    return object;
}
