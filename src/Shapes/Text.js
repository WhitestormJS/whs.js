/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Text = class Text extends WHS.Shape {

	constructor( params ) {

		super( params, "text" );

		api.extend(params.geometry, {

            text: "Hello World!",
            
            parameters: {
                size: 12,
                height: 50,
                curveSegments: 12,
                font: new THREE.Font(),
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8
            }

        });

        var scope = this;

        this._loading = new Promise(function(resolve, reject) {

            api.loadFont(params.geometry.parameters.font, function( font ) {

                params.geometry.parameters.font = font;

                console.log(params.geometry);

        		scope.mesh = new Physijs.ConcaveMesh( 
                    new THREE.TextGeometry(

                        params.geometry.text,
                        params.geometry.parameters

                    ), 

                    api.loadMaterial(params.material)._material, 
                    params.mass 
                );

                resolve();

            });

        });

        super.build("wait");

	}

}

WHS.World.prototype.Text = function( params ) {
	return ( new WHS.Text(  params ) ).addTo( this, "wait" );
}
