/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/** Camera super class */
WHS.Camera = class extends WHS.Object{
	/**
	 * Constructing WHS.Camera object.
	 * 
	 * @param {Object} params - Inputed parameters.
	 * @param {String} type - Camera type.
	 * @return {WHS.Camera}
	 */
	constructor( params, type ) {

		if ( !type ) 
			console.error( "@constructor: Please specify \" type \"." );

		let _set = function( x, y, z ) {

			this.x = x;
			this.y = y;
			this.z = z;

		}

		super({
			camera: {
				fov: 45,
				aspect: window.innerWidth / window.innerHeight,
				near: 1,
				far: 1000,

				left: window.innerWidth / - 2,
				right: window.innerWidth / 2,
				top: window.innerHeight / 2,
				bottom: window.innerHeight / - 2,

				cubeResolution: 128
			},

			helper: false,

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
			}
		});

		super.setParams( params );

		var scope = Object.assign( this,
		{
			_type: type,
			helper: false
		});

		if ( WHS.debug ) console.debug("@WHS.Camera: Camera " + scope._type +
			" found.", scope);

		return scope;
	}

	/**
	 * Applying position & rotation.
	 *
	 * @param {...String} tags - Tags that defines what to do with light 
	 * additionally.
	 */
	build( ...tags ) {

		'use strict';

		var camera = this.camera,
		_scope = this;

		return new Promise( (resolve, reject) => {

			try {

				_scope.position.set(
					_scope.__params.pos.x, 
					_scope.__params.pos.y, 
					_scope.__params.pos.z 
				);

				_scope.rotation.set( 
					_scope.__params.rot.x, 
					_scope.__params.rot.y, 
					_scope.__params.rot.z 
				);

				if ( _scope.__params.helper )
		            _scope.helper = new THREE.CameraHelper( 
		                _scope.camera
		            );

				tags.forEach(tag => {
					_scope[tag] = true;
				});      

				if ( WHS.debug ) console.debug("@WHS.Camera: Camera " 
		        	+ _scope._type + " is ready.", _scope);

				_scope.emit("ready");

				resolve( _scope );

			} catch ( err ) {

				console.error( err.message );

				reject();

			}

		});
	}

	/**
	 * Add light to WHS.World object.
	 *
	 * @param {WHS.World} root - World, were this light will be. 
	 * @param {...String} tags - Tags for compiling. 
	 */
	addTo( parent ) {

		'use strict';

		this.parent = parent;

		var _camera = this.camera,
			_helper = this.helper,
			_scope = this;

		return new Promise( (resolve, reject) => {

			try {

				_scope.parent.scene.add( _camera );
				_scope.parent.children.push( _scope );

				if ( _helper ) _scope.parent.scene.add( _helper );

			} catch ( err ) {

				console.error( err.message );
				reject();

			} finally {

				if ( WHS.debug ) console.debug("@WHS.Camera: Camera " 
		        	+ _scope._type + " was added to world.", 
		        	[_scope, _scope.parent]);

				resolve( _scope );

				_scope.emit("ready");

			}

		} );
	}

	get position() {
		return this.camera.position;
	}

	set position( vector3 ) {
		return this.camera.position.copy( vector3 );
	}

	get rotation() {
		return this.camera.rotation;
	}

	set rotation( euler ) {
		return this.camera.rotation.copy( euler );
	}
}
