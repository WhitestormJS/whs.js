/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * WhitestormJS model
 *
 * @extends WHS.Shape
 */

WHS.Model = class Model extends WHS.Shape {

    /**
     * Create a model
     *
     * @param {Object} params - Model options
     * @param {Object} params.geometry - Model geometry options
     * @param {String} params.geometry.path - Path to model JSON
     * @param {Material} params.material - Model material
     * @param {Number} params.mass - Model mass
     */

	constructor( params ) {

		super( params, "model" );

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

                scope.mesh = new Physijs.ConvexMesh(data, material, params.mass);

                resolve();

            });

        });

        super.build("wait");

	}

}

WHS.World.prototype.Model = function( params ) {
	return ( new WHS.Model(  params ) ).addTo( this, "wait" );
}
