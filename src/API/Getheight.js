/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Shape. Makes *THREE.JS* shape.
 *
 * @param {Object} pos Position x/y/z.
 * @param {Number} diff Intersect line length from top.
 * @param {Object} terrain *WHS* terrain object.
 * @param {Number} direction Direction of raycast vector.
 * @returns {Object} Intersect array.
 */
WHS.API.getheight = function( pos, diff, terrain, direction ) {

	'use strict';

	diff = diff || 1000;

	direction = direction || 1;

	this.raycaster = new THREE.Raycaster(
		new THREE.Vector3( pos.x, diff, direction * pos.y ),
		new THREE.Vector3( 0, - 1, 0 )
	);

	this.intersect = this.raycaster.intersectObject( terrain.visible );

	return this.intersect;

}
