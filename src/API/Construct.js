/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.API.construct = function( root, params, type ) {

	'use strict';

	if ( ! root )
	console.error( "@constructor: WHS root object is not defined." );

	var _set = function( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

	}

	if ( params.pos ) params.pos.set = _set;
	if ( params.rot ) params.rot.set = _set;
	if ( params.scale ) params.scale.set = _set;
	if ( params.target ) params.target.set = _set;

	// Polyfill for 3D.
	var target = api.extend(params, {

		pos: {
			x: 0,
			y: 0,
			z: 0,
			set: _set
		},

		rot: {
			x: 0,
			y: 0,
			z: 0,
			set: _set
		},

		scale: {
			x: 1,
			y: 1,
			z: 1,
			set: _set
		},

		target: {
			x: 0,
			y: 0,
			z: 0,
			set: _set
		},

		morph: {
			speed: 1,
			duration: 1
		},

		onlyvis: false

	} );


	var key = 0;

	root.modellingQueue.forEach( function( el ) {

		if ( el.type == type ) key ++;

	} );

	var scope = {
		root: root,
		_key: key,
		_whsobject: true,
		_name: type + key,
		__releaseTime: new Date().getTime(),
		_pos: target.pos,
		_rot: target.rot,
		_scale: target.scale,
		_morph: target.morph,
		_target: target.target,
		_onlyvis: target.onlyvis
	};

	Object.assign( this, scope );

	return this;

}

WHS.API.construct.prototype = {

	build: function( mesh ) {
		
		'use strict';

		mesh = mesh || this.mesh;

		this.build_state = new Promise( (resolve, reject) => {

			try {

				mesh.castShadow = true;
				mesh.receiveShadow = true;

				mesh.position.set( this._pos.x, this._pos.y, this._pos.z );
				mesh.rotation.set( this._rot.x, this._rot.y, this._rot.z );
				mesh.scale.set( this._scale.x, this._scale.y, this._scale.z );

				resolve();

			} catch ( err ) {

				console.error( err.message );

				reject();

				//this._state.reject();

			}

		});

		return this;
	},

	wrap: function(mesh) {

		'use strict';

		var _mesh = mesh || this.mesh,
			_scope = this;

		this._key = this.root.modellingQueue.length;

		this._state = new Promise( (resolve, reject) => {

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
	},

	remove: function() {
		
		this.root.scene.remove( this.mesh );

		return this;

	},

	retrieve: function() {

		this.root.scene.add( this.mesh );

		return this;

	}

}
