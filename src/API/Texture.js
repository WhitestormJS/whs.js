/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Texture. Loads texture object.
 *
 * @param {String} url - Url adress of texture *JSON*.
 * @param {Object} options - Parameters of texture.
 * @return {Object} Three.JS texture.
 */
WHS.API.texture = function( url, options ) {
	
	'use strict';

	var texture = WHS.API.loadTexture( url );

	if ( options ) {

		var opt = WHS.API.extend(options, {

			offset: {
				x: 0,
				y: 0
			},

			repeat: {
				x: 1,
				y: 1
			}

		});

		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

		texture.offset.set(opt.offset.x, opt.offset.y);
		texture.repeat.set( opt.repeat.x, opt.repeat.y );

		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.LinearMipMapLinearFilter;

	}

	return texture;

}
