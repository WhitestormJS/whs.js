/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS point light.
 *
 * @extends WHS.Light
 */
WHS.PointLight = class PointLight extends WHS.Light {
    /**
     * Point light.
     *
     * @param {Object} params.light.color - Light color.
     * @param {Object} params.light.intensity - Light intensity.
     * @param {Object} params.light.distance - Light distance.
     * @param {Object} params.light.decay - Light decay.
     */
	constructor( params = {} ) {

		super( params, "pointlight" );

		this.build( params );

        super.wrap();
        super.wrapShadow();

	}

    build( params = {} ) {

        let _scope = this;

        return new Promise( (resolve, reject) => {
            _scope.light = new THREE.PointLight(
                params.light.color,
                params.light.intensity,
                params.light.distance,
                params.light.decay
            );

            if ( params.helper )
                _scope.helper = new THREE.PointLightHelper( 
                    _scope.light, 
                    params.helper.size ? params.helper.size : 0
                );

            resolve();
        });

    }

}

WHS.World.prototype.PointLight = function( params ) {
    let object = new WHS.PointLight( params );

    object.addTo( this );

    return object;
}
