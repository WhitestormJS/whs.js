/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Model = class Model extends WHS.Shape {

	constructor( params ) {

		super( params, "model" );

		api.extend(params.geometry, {

            path: ""

        });

        var scope = this;

        this._loading = new Promise(function(resolve, reject) {

            api.loadJSON(params.geometry.path, function(data, mateial) {

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

WHS.init.prototype.Model = function( params ) {
	return ( new WHS.Model(  params ) ).addTo( this, "wait" );
}
