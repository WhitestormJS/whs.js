/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * REMOVEDUPLICEFACES.
 *
 * @param {Object} geometry *THREE.JS* geometry. (REQUIRED)
 * @return {Object} geometry *THREE.JS* geometry.
 */
WHS.API.removeDuplicateFaces = function( geometry ) {

	for ( var i = 0; i < geometry.faces.length; i ++ ) {

		var tri = geometry.faces[ i ];
		var inds = [ tri.a, tri.b, tri.c, tri.d ].sort();
		for ( var j = 0; j < i; j ++ ) {

			var tri_2 = geometry.faces[ j ];
			if ( tri_2 !== undefined ) {

				// May have already been deleted
				var inds_2 = [ tri_2.a, tri_2.b, tri_2.c, tri_2.d ].sort();
				if ( WHS.API.isSame( inds, inds_2 ) ) {

					delete geometry.faces[ i ]; // Sets these faces to undefined
					// If duplicate, it is also interior, so remove both
					delete geometry.faces[ j ];

				}

			}

		}

	}
	geometry.faces = geometry.faces.filter( function( a ) {

		return a === undefined

	} );
	return geometry;

}
