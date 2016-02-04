/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
 */

/**
 * Adds a skybox to the WhitestormJS scene.
 * @param {Object} options - Skybox options.
 * @param {String} options.src - Skybox image source.
 * @param {String} options.imgSuffix - Skybox image suffix (.png, .jpg, etc.)
 * @param {String} options.skyType - Type of sky. Either box or sphere.
 * @returns {Object} scope - Scope.
 */
WHS.init.prototype.addSkybox = function( options ) {

 	'use strict';

 	options.skyType = options.skyType || "box";

 	options.imgSuffix = options.skyType == "box" ? options.imgSuffix || ".png" : options.imgSuffix || "";

 	var scope = new WHS.Shape( this, options, "skybox" );
 	scope.skip = true;

 	var skyGeometry, skyMat;

 	switch ( options.skyType ) {
 		case "box":
 			var directions = [ "xpos", "xneg", "ypos", "yneg", "zpos", "zneg" ];
 			skyGeometry = new THREE.CubeGeometry( this._camera.far, this._camera.far, this._camera.far );
 			var matArray = [];

 			for ( var i = 0; i < 6; i ++ ) {

 				matArray.push( new THREE.MeshBasicMaterial( {
 					map: THREE.ImageUtils.loadTexture( options.src + directions[ i ] + options.imgSuffix ),
 					side: THREE.BackSide
 				} ) );

 			}

 			skyMat = new THREE.MeshFaceMaterial( matArray );

 			break;
 		case "sphere":

 			skyGeometry = new THREE.SphereGeometry( this._camera.far / 2, 60, 40 );

 			skyMat = new THREE.MeshBasicMaterial( {
 				map: THREE.ImageUtils.loadTexture( options.src + options.imgSuffix ),
 				side: THREE.BackSide
 			} );

 			break;
 	}

 	scope.mesh = new THREE.Mesh( skyGeometry, skyMat );
 	scope.mesh.renderDepth = 1000.0;

 	scope.build().wrap();

 	return scope;

 };
