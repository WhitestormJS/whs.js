/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.API.extend = function( object, ...extensions ) { // $.extend alternative, ... is the spread operator.
	for( var extension of extensions ){
		if( !extension )
			continue; // Ignore null and undefined objects and paramaters.

		for( var prop of Object.getOwnPropertyNames( extension ) ) { // Do not traverse the prototype chain.
			object[prop] = ( object[prop] === 0 )? 0 : object[prop] || extension[prop]; // Add values that do not already exist.
		}
	}

	return object;
}
