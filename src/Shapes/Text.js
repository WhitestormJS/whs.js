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
                size: 1,
                height: 50,
                curveSegments: 1,
                font: "Adelle",
                weight: "normal",
                style: "normal",
                bevelEnabled: false,
                bevelThickness: 10,
                bevelSize: 8
            }

        });

		this.mesh = new Physijs.ConcaveMesh( 
            new THREE.TextGeometry(

                params.geometry.text,
                params.geometry.parameters

            ), 

            super._initMaterial(params.material), 
            params.mass 
        );

        super.build();

	}

}

WHS.init.prototype.Text = function( params ) {
	return ( new WHS.Text(  params ) ).addTo( this );
}
