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
WHS.API.texture = function( url, options ) {
	
	'use strict';

	var texture = api.TextureLoader().load( url );

	if ( options ) {

		var opt = options;
		
		opt.offset = opt.offset || {
			x: 1,
			y: 1
		};

		opt.offset.x = opt.offset.x || 1;
		opt.offset.y = opt.offset.y || 1;

		opt.repeat = opt.repeat || {
			x: 1,
			y: 1
		};

		opt.repeat.x = opt.repeat.x || 1;
		opt.repeat.y = opt.repeat.y || 1;

		texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

		//texture.offset.set(opt.offset.x, opt.offset.y);
		texture.repeat.set( opt.repeat.x, opt.repeat.y );

		texture.magFilter = THREE.NearestFilter;
		texture.minFilter = THREE.LinearMipMapLinearFilter;

	}

	return texture;

}
