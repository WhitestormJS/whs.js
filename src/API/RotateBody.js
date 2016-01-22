/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Rotate body. Rotates body object *CANNON.JS*.
 *
 * @param {Object} body Body object in *CANNON.JS*. (REQUIRED)
 * @param {Object} rotateSet Object of x, y, z coords. (REQUIRED)
 * @return {Object} Body object in *CANNON.JS*.
 */
WHS.API.rotateBody = function( body, rotateSet ) {
	'use strict';

	// Replaces 2 divisions with one.
	body.quaternion.x = Math.sin( ( Math.PI / 360 ) * rotateSet.x );
	body.quaternion.y = Math.sin( ( Math.PI / 360 ) * rotateSet.y );
	body.quaternion.z = Math.sin( ( Math.PI / 360 ) * rotateSet.z );
	
	body.quaternion.w = Math.cos( 45 ); //Was 90*0.5 before, hardcoding is better for constants

	return body;

}
