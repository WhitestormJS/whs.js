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
			__params: target,

			parent: null,

			_light: target.light,
			_shadowmap: target.shadowmap,
		},
		new Events());

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
	build( ...tags ) {

		'use strict';

		var mesh = this.mesh,
		_scope = this;

		return new Promise( (resolve, reject) => {

			try {

				mesh.castShadow = true;
				mesh.receiveShadow = true;

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

				if ( WHS.debug ) console.debug("@WHS.Light: Light " 
		        	+ _scope._type + " was added to worl.", 
		        	[_scope, _scope.parent]);


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
	 * Clone light.
	 */
	clone() {

		let clone = this.constructor(
				WHS.API.extend({
					pos: this.position,
					rot: this.rotation,
					shadowmap: this._shadowmap,
					light: this._light,
					target: this.target
				}, this.__params),
				this._type
			);

		function isObject( val ) {
			return typeof val === "object" && val !== null;
		}

		function clone_local_obj( obj ) {

			if ( obj instanceof THREE.Light
				|| obj instanceof THREE.Object3D ) return obj.clone();
			if ( obj instanceof Element 
				|| obj instanceof Node
				|| obj instanceof WHS.World ) return obj;

			let clone = obj.constructor() || obj;

			for (var key in obj) {
				clone[key] = !isObject( obj[key] )
					? obj[key] 
					: clone_local_obj( obj[key] );
			}

			return clone;

		}

		for (var key in this) {
			clone[key] = !isObject( this[key] )
				? this[key] 
				: clone_local_obj( this[key] );
		}

		return clone;

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


	get position() {
		return this.mesh.position;
	}

	set position( vector3 ) {
		return this.mesh.position = vector3;
	}

	get rotation() {
		return this.mesh.rotation;
	}

	set rotation( euler ) {
		return this.mesh.rotation = euler;
	}

	get target() {
		return this.mesh.target.position;
	}

	set target( vector3 ) {
		return this.mesh.target.position = vector3;
	}

}
