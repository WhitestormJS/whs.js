/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/** Light super class */
WHS.Light = class extends WHS.Object {
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

		// Polyfill for 3D.
		super({

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

	        helper: false,

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

		super.setParams( params );

		var scope = Object.assign(this,
		{
			_type: type,

			_light: this.__params.light,
			_shadowmap: this.__params.shadowmap,
		});

		if ( WHS.debug ) console.debug("@WHS.Light: Light " + scope._type +
			" found.", scope);

		return scope;
	}

	/**
	 * Applying shadow & position & rotation.
	 *
	 * @param {...String} tags - Tags that defines what to do with light 
	 * additionally.
	 */
	wrap( ...tags ) {

		'use strict';

		var light = this.light,
		_scope = this;

		return new Promise( (resolve, reject) => {

			try {

				if (tags.indexOf("noshadows") < 0) {

					light.castShadow = true;
					light.receiveShadow = true;

				}

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

				tags.forEach(tag => {
					_scope[tag] = true;
				});		                

				if ( WHS.debug ) console.debug("@WHS.Light: Light " 
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

		var _light = this.light,
			_helper = this.helper,
			_scope = this;

		return new Promise( (resolve, reject) => {

			try {

				_scope.parent.scene.add( _light );
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

	/** 
	 * Set shadow properties for light.
	 */
	wrapShadow() {

		let _scope = this;

		return new Promise( (resolve, reject) => {

		    try {

			    this.light.shadow.mapSize.width = this._shadowmap.width;
			    this.light.shadow.mapSize.height = this._shadowmap.height;
			    this.light.shadow.bias = this._shadowmap.bias;

			    this.light.shadow.camera.near = this._shadowmap.near;
			    this.light.shadow.camera.far = this._shadowmap.far;
			    this.light.shadow.camera.fov = this._shadowmap.fov;

			    this.light.shadow.camera.Left = this._shadowmap.left;
			    this.light.shadow.camera.right = this._shadowmap.right;
			    this.light.shadow.camera.top = this._shadowmap.top;
			    this.light.shadow.camera.bottom = this._shadowmap.bottom;

			} catch ( err ) {

				console.error( err.message );
				reject();

			} finally {

				resolve( _scope );

			}

		});

	}

	/**
	 * Clone light.
	 */
	clone() {

		return new WHS.Light( this.__params, this._type ).copy( this );

	}

	/**
	 * Copy light.
	 *
	 * @param {WHS.Light} source - Source object, that will be applied to this.
	 */
	copy( source ) {

		this.light = source.light.clone();
		if ( source.helper ) this.helper = source.helper.clone();

		this.wrap();

		this.position = source.position.clone();
		this.rotation = source.rotation.clone();

		this._type = source._type;

		return this;

	}

	/**
	 * Remove this light from world.
	 */
	remove() {
		
		this.parent.scene.remove( this.light );
		if ( source.helper ) this.parent.scene.remove( this.helper );

        this.parent.children.splice( this.parent.children.indexOf( this ), 1);
        this.parent = null;

        this.emit("remove");

		return this;

	}

	get position() {
		return this.light.position;
	}

	set position( vector3 ) {
		return this.light.position.copy( vector3 );
	}

	get rotation() {
		return this.light.rotation;
	}

	set rotation( euler ) {
		return this.light.rotation.copy( euler );
	}

	get target() {
		return this.light.target.position;
	}

	set target( vector3 ) {
		return this.light.target.position.copy( vector3 );
	}

}
