/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.API.Wrap = function( SCOPE, mesh ) {
	
	'use strict';

	var _mesh = mesh,
		_scope = SCOPE;

	this._key = SCOPE.root.modellingQueue.length;

	_scope._state = new Promise( (resolve, reject) => {

		try {

			api.merge( _scope.root.scene, _mesh );
			_scope.root.modellingQueue.push( _scope );

		} catch ( err ) {

			console.error( err.message );
			reject();

		} finally {

			if ( _scope._wait ) {

				_scope._mesh.addEventListener( 'ready', function() {
					resolve();
				} );

			} else
				resolve();

		}

	} );

	_scope.root.children.push( _scope );

	return this;

}

WHS.API.Wrap.prototype = {

	remove: function() {
		
		this._scope.root.scene.remove( this._mesh );

		return this;

	},

	retrieve: function() {

		this._scope.root.scene.add( this._mesh );

		return this;

	}
}
