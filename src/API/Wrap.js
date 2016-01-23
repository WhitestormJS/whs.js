/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

// DONE:0 Make Wrap function.
WHS.API.Wrap = function( SCOPE, mesh ) {
	'use strict';

	this._mesh = mesh;
	this._scope = SCOPE;
	this._key = SCOPE.root.modellingQueue.length;

	try {

		api.merge( this._scope.root.scene, this._mesh );

		this._scope.root.modellingQueue.push( this._scope );

	} catch ( err ) {

		console.error( err.message );

		this._scope.__deferred.reject();

	} finally {

		if ( this._scope._wait ) {

			var sc = this;
			sc._mesh.addEventListener( 'ready', function() {

				sc._scope.__deferred.resolve();

			} );

		} else {

			this._scope.__deferred.resolve();

		}

	}

	return this;

}

WHS.API.Wrap.prototype.remove = function() {
	'use strict';

	this._scope.root.scene.remove( this._mesh );

	WHS.objects.splice( this._key, 1 );

	return this;

}

WHS.API.Wrap.prototype.retrieve = function() {
	'use strict';

	this._scope.root.scene.add( this._mesh );

	WHS.objects.push( this._scope );

	return this;

}
