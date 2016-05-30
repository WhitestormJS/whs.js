class ConvexModel extends WHS.Shape {
	constructor(params = {}) {
		super(params, 'model');

		WHS.API.extend(params.geometry, {
      path: '',
      physics: '',
    });

    var scope = this;

    this.build( params );
    super.wrap('wait');
	}

	build( params = {} ) {

        let _scope = this,
            mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh;

        let promise = new Promise( ( resolve, reject ) => {

            WHS.API.loadJSON(params.geometry.path, ( data, materials ) => {

                console.log(materials);

            	if (params.geometry.physics != "") {

            		WHS.API.loadJSON(params.geometry.physics, data2 => {

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

	                    data.computeFaceNormals();
	                    data.computeVertexNormals();

	                    _scope.setNative( new mesh(
	                    	data,
	                    	material,
	                    	params.mass,
	                    	data2,
	                    	params.scale
	                	) );

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

                    _scope.setNative( new mesh(
                    	data,
                    	material,
                    	params.mass
					) );

                    resolve();
                }

            });

        });

        super.wait( promise );

        return promise;

    }

    /**
     * Clone model.
     */
    clone() {

        return new WHS.ConvexModel( this.getParams() ).copy( this );

    }

}

WHS.World.prototype.ConvexModel = function( params ) {
    let object = new WHS.ConvexModel(  params );

    object.addTo( this, "wait" );

    return object;
}
