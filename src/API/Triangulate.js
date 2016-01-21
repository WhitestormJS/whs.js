/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * TRIANGULATE.
 *
 * @param {Object} thrObj *THREE.JS* geometry. (REQUIRED)
 * @param {Object} material *THREE.JS* material. (REQUIRED)
 */
WHS.API.Triangulate = function( thrObj, material ) {

	'use strict';

	if ( ! ( thrObj instanceof THREE.Geometry ) )
	console.error( "No THREE.js geometry" );
	//If it is instance, then it is defined !
	else if ( material ) {

		var triangles = new THREE.Geometry();
		var materials = [];

		thrObj.faces.forEach( function( element ) {

			var triangle = new THREE.Geometry();

			[].push.apply( triangle.vertices, [
			thrObj.vertices[ element.a ],
			thrObj.vertices[ element.b ],
			thrObj.vertices[ element.c ]
			] );

			triangle.faceVertexUvs[ 0 ].push( [
			new THREE.Vector2( 0, 0 ),
			new THREE.Vector2( 0, 1 ),
			new THREE.Vector2( 1, 1 ),
			new THREE.Vector2( 1, 0 ),
			] );

			triangle.faces.push( new THREE.Face3( 0, 1, 2 ) );
			triangle.computeFaceNormals();

			var triangleMesh = new THREE.Mesh( triangle, material );
			triangleMesh.updateMatrix();

			triangles.merge( triangleMesh.geometry, triangleMesh.matrix );
			materials.push( material );

		} );

		var trianglesMesh = new THREE.Mesh( triangles, new THREE.MeshFaceMaterial( materials ) );
		return trianglesMesh;

	}

}
