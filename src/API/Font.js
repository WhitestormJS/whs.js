/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Texture. Loads texture object.
 *
 * @param {String} url Url adress of texture *JSON*. (REQUIRED)
 * @param {Object} options Parameters of texture. (REQUIRED)
 * @return {Object} *THREE.JS* texture.
 */
WHS.API.font = function( url ) {
	
	'use strict';

	var texture = api.loadFont( url, function( font ) {
		return font;
	});

}
