/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS perspective light.
 *
 * @extends WHS.Light
 */
WHS.PerspectiveCamera = class PerspectiveCamera extends WHS.Camera {
	/**
     * Perspective camera.
     *
     * @param {Object} params.camera.fov - Fov.
     * @param {Object} params.camera.aspect - Aspect.
     * @param {Object} params.camera.near - Near distance.
     * @param {Object} params.camera.far - Far distance.
     */
	constructor( params = {} ) {

		super( params, "perspectivecamera" );

		this.build( params );

        super.wrap();

	}

    build( params = {} ) {

        let _scope = this;

        return new Promise( (resolve, reject) => {
            _scope.setNative( new THREE.PerspectiveCamera(
                params.camera.fov,
                params.camera.aspect,
                params.camera.near,
                params.camera.far
            ) );

            resolve();
        });

    }

}

WHS.World.prototype.PerspectiveCamera = function( params ) {
    let camera = new WHS.PerspectiveCamera( params );

    camera.addTo( this );

    return camera;
}
