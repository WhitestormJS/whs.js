/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * MERGE.
 *
 * @param {Object} box Object to be merged. (REQUIRED)
 * @param {Object} rabbits Object to be added. (REQUIRED)
 */
WHS.API.merge = function( box, rabbits ) {

	'use strict';
	//More presice checking
	if ( ! ( typeof box === 'object' && typeof rabbits === 'object' ) )
	console.error( "No rabbits for the box. (arguments)", [ typeof box, typeof rabbits ] );
	//Will only get here if box and rabbits are objects, arrays are object !
	if ( ! box )//Box should not be null, null is an object too !
	// #FIXME:0 Fix caller function line number.
	console.error( "box is undefined. Line " + ( new Error ).lineNumber + ". Func merge.", [ box, rabbits ] );
	else {

		if ( Array.isArray( rabbits ) && rabbits.length === 1 )
		//Should not be 0
		box.add( rabbits[ 0 ] );
		else if ( Array.isArray( rabbits ) && rabbits.length > 1 && box ) {

			for ( var i = 0; i < rabbits.length; i ++ ) {

				box.add( rabbits[ i ] );

			}

		} else if ( ! Array.isArray( rabbits ) )
		box.add( rabbits );

	}

}
