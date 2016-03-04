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

        var scope = this,
            material = super._initMaterial(params.material);

        this._loading = new Promise(function(resolve, reject) {

            api.loadJSON(params.geometry.path, function(data) {

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
