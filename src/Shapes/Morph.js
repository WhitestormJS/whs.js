/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS morph
 *
 * @extends WHS.Shape
 */

WHS.Morph = class Morph extends WHS.Shape {

    /**
     * Create a morph
     *
     * @param {Object} params - Morph options
     * @param {Object} params.geometry - Morph geometry options
     * @param {String} params.geometry.path - Path to morph JSON
     * @param {Material} params.material - Morph material
     * @param {Number} params.mass - Morph mass
     * @param {Object} params.morph - Morph options
     * @param {Number} params.morph.speed - Morph speed
     * @param {Number} params.morph.duration - Morph duration
     */

	constructor( params ) {

		super( params, "morph" );

		api.extend(params.geometry, {

            path: ""

        });

        var scope = this;

        this._loading = new Promise(function(resolve, reject) {

            api.loadJSON(params.geometry.path, function(data, materials) {

                if (!materials || params.material.useVertexColors)
                    var material = api.loadMaterial(
                        api.extend(params.material, {
                            morphTargets: true,
                            vertexColors: THREE.FaceColors
                        })
                    )._material;
                else if (params.material.useCustomMaterial)
                    var material = api.loadMaterial(
                        params.material
                    )._material;
                else var material = new THREE.MultiMaterial(materials);

                data.computeFaceNormals();
                data.computeVertexNormals();

                // Visualization.
                scope.mesh = new THREE.Mesh( data, material );
                scope.mesh.speed = params.morph.speed;

                scope.mesh.mixer = new THREE.AnimationMixer( scope.mesh );

                scope.mesh.mixer
                    .clipAction( data.animations[ 0 ] )
                    .setDuration( params.morph.duration )
                    .play();

                scope._rot.y = Math.PI / 2;

                resolve();

            });

        });

        super.build("wait");

	}

}

WHS.World.prototype.Morph = function( params ) {
	return ( new WHS.Morph(  params ) ).addTo( this, "wait" );
}
