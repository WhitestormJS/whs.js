/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.Skybox = class Skybox extends WHS.Shape {

	constructor( params = {} ) {

		super( params, "skybox" );

        WHS.API.extend(params, {

            skyType: "box",
            detail: ".png",
            radius: 10,
            fog: true,

            path: ""

        });

        var skyGeometry, skyMat;

		switch ( params.skyType ) {
            case "box":

                var directions = [ "xpos", "xneg", "ypos", "yneg", "zpos", "zneg" ];

                skyGeometry = new THREE.CubeGeometry( params.radius, params.radius, params.radius );

                var matArray = [];

                for ( var i = 0; i < 6; i ++ ) {

                    matArray.push( new THREE.MeshBasicMaterial( {
                        map: THREE.ImageUtils.loadTexture( params.path + directions[ i ] + params.imgSuffix ),
                        side: THREE.BackSide,
                        fog: params.fog
                    } ) );

                }

                skyMat = new THREE.MeshFaceMaterial( matArray );

                break;
            case "sphere":

                skyGeometry = new THREE.SphereGeometry( params.radius / 2, 60, 40 );

                skyMat = new THREE.MeshBasicMaterial( {
                    map: THREE.ImageUtils.loadTexture( params.path + params.imgSuffix ),
                    side: THREE.BackSide,
                    fog: params.fog
                } );

                break;
        }

        this.mesh = new THREE.Mesh( skyGeometry, skyMat );
        this.mesh.renderDepth = 1000.0;

        super.build();

	}

}

WHS.World.prototype.Skybox = function( params ) {
    let object = new WHS.Skybox( params );

    object.addTo( this );

    return object;
}
