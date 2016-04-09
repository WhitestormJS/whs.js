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
	constructor( params = {} ) {

		super( params, "model" );

		WHS.API.extend(params.geometry, {

            path: "",
            physics: "",


        });

        var scope = this;

        super.wait(
            new Promise(function(resolve, reject) {

                WHS.API.loadJSON(params.geometry.path, function(data, materials) {

                	if (params.geometry.physics != "") {

                		WHS.API.loadJSON(params.geometry.physics, function(data2) {

                			if (params.material.useVertexColors)
		                        var material = WHS.API.loadMaterial(
		                            WHS.API.extend(params.material, {
		                                morphTargets: true,
		                                vertexColors: THREE.FaceColors
		                            })
		                        )._material;
		                    else if (!materials || params.material.useCustomMaterial)
		                        var material = WHS.API.loadMaterial(
		                            params.material
		                        )._material;
		                    else var material = new THREE.MultiMaterial(materials);

		                    console.log(data);

		                    data.computeFaceNormals();
		                    data.computeVertexNormals();



		                    scope.mesh = new Physijs.ConcaveMesh( 
		                    	data, 
		                    	material, 
		                    	params.mass,
		                    	data2,
		                    	params.scale
		                	);

		                    resolve();

                		});
                	} else {

	                    if (!materials || params.material.useVertexColors)
	                        var material = WHS.API.loadMaterial(
	                            WHS.API.extend(params.material, {
	                                morphTargets: true,
	                                vertexColors: THREE.FaceColors
	                            })
	                        )._material;
	                    else if (params.material.useCustomMaterial)
	                        var material = WHS.API.loadMaterial(
	                            params.material
	                        )._material;
	                    else var material = new THREE.MultiMaterial(materials);

	                    data.computeFaceNormals();
	                    data.computeVertexNormals();

	                    scope.mesh = new Physijs.ConcaveMesh( 
	                    	data, 
	                    	material, 
	                    	params.mass
						);

	                    resolve();
	                }

                });

            })
        );

        super.build("wait");

	}

}

WHS.World.prototype.Model = function( params ) {
    let object = new WHS.Model(  params );

    object.addTo( this, "wait" );

    return object;
}
