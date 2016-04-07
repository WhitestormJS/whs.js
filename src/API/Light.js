/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/** Light super class */
WHS.Light = class {
	/**
	 * Constructing WHS.Light object.
	 * 
	 * @param {Object} params - Inputed parameters.
	 * @param {String} type - Light type.
	 * @return {WHS.Light}
	 */
	constructor( params, type ) {

		if ( !type ) 
			console.error( "@constructor: Please specify \" type \"." );

		var _set = function( x, y, z ) {

			this.x = x;
			this.y = y;
			this.z = z;

		}

		if ( params.pos ) params.pos.set = _set;
		if ( params.rot ) params.rot.set = _set;
		if ( params.target ) params.target.set = _set;

		// Polyfill for 3D.
		var target = WHS.API.extend(params, {

	        light: {
	        	color: 0xffffff,
	        	skyColor: 0xffffff,
	        	groundColor: 0xffffff,

	        	intensity: 1,
	        	distance: 100,
	        	angle: Math.PI/3,
                exponent: 0,
                decay: 1
	        },

	        shadowmap: {
	            cast: true,

	            bias: 0,

	            width: 1024,
	            height: 1024,

	            near: true,
	            far: 400,
	            fov: 60,
	            darkness: 0.3,

	            top: 200,
	            bottom: -200,
	            left: -200,
	            right: 200
	        },

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

			target: {
				x: 0,
				y: 0,
				z: 0,
				set: _set
			}

		});

		var scope = Object.assign(this,
		{
			_type: type,
			_whsobject: true,
			__releaseTime: new Date().getTime(),

			parent: null,

			position: target.pos,
			rotation: target.rot,
			target: target.target,

			_light: target.light,
			_shadowmap: target.shadowmap,
		},
		new Events());

		return scope;
	}

	/**
	 * Applying shadow & position & rotation.
	 *
	 * @param {...String} tags - Tags that defines what to do with light 
	 * additionally.
	 */
	build( ...tags ) {

		'use strict';

		var mesh = this.mesh,
		_scope = this;

		return new Promise( (resolve, reject) => {

			try {

				mesh.castShadow = true;
				mesh.receiveShadow = true;

				mesh.position.set( 
					this.position.x, 
					this.position.y, 
					this.position.z 
				);

				mesh.rotation.set( 
					this.rotation.x, 
					this.rotation.y, 
					this.rotation.z 
				);

				tags.forEach(tag => {
					_scope[tag] = true;
				});

				resolve( _scope );

			} catch ( err ) {

				console.error( err.message );

				reject();

				//this._state.reject();

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
		this._lastWorld = parent;

		var _mesh = this.mesh,
			_scope = this;

		return new Promise( (resolve, reject) => {

			try {

				WHS.API.merge( _scope.parent.scene, _mesh );
				_scope.parent.children.push( _scope );

			} catch ( err ) {

				console.error( err.message );
				reject();

			} finally {

				if ( _scope._wait ) {

					_scope._mesh.addEventListener( 'ready', function() {
						resolve( _scope );

						_scope.emit("ready");
					} );

				} else {
					resolve( _scope );

					_scope.emit("ready");
				}

			}

		} );
	}

	/** 
	 * Set shadow properties for light.
	 */
	buildShadow() {

		let _scope = this;

		return new Promise( (resolve, reject) => {

		    try {

			    this.mesh.shadow.mapSize.width = this._shadowmap.width;
			    this.mesh.shadow.mapSize.height = this._shadowmap.height;
			    this.mesh.shadow.bias = this._shadowmap.bias;

			    this.mesh.shadow.camera.near = this._shadowmap.near;
			    this.mesh.shadow.camera.far = this._shadowmap.far;
			    this.mesh.shadow.camera.fov = this._shadowmap.fov;

			    this.mesh.shadow.camera.Left = this._shadowmap.left;
			    this.mesh.shadow.camera.right = this._shadowmap.right;
			    this.mesh.shadow.camera.top = this._shadowmap.top;
			    this.mesh.shadow.camera.bottom = this._shadowmap.bottom;

			} catch ( err ) {

				console.error( err.message );
				reject();

			} finally {

				resolve( _scope );

			}

		});

	}

	/**
	 * Remove this light from world.
	 */
	remove() {
		
		this.parent.scene.remove( this.mesh );

        this.parent.children.splice( this.parent.children.indexOf( this ), 1);
        this.parent = null;

        this.emit("remove");

		return this;

	}

	/**
	 * Add this light to last applied world.
	 */
	retrieve() {

        this.parent = this._lastWorld;
                
		this.parent.scene.add( this.mesh );
		this.parent.children.push( this );

		this.emit("retrieve");

		return this;

	}

}
