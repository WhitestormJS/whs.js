/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/** Shape super class */
WHS.Shape = class {
	/**
	 * Constructing WHS.Shape object.
	 * 
	 * @param {Object} params - Inputed parameters.
	 * @param {String} type - Shape type.
	 * @return {WHS.Shape}
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
		WHS.API.extend(params, {

			mass: 10,

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

		} );

		var scope = Object.assign( this,
		{
			_type: type,
			_whsobject: true,
			__releaseTime: new Date().getTime(),
			parent: null,

			wait: [],

			position: params.pos,
			rotation: params.rot,
			scale: params.scale,
			morph: params.morph,
			target: params.target
		},
		new Events());

		return scope;
	}

	wait( promise ) {

		this.wait.push( promise );
		
		return this;

	}

	/**
	 * Applying shadow & position & rotation.
	 *
	 * @param {...String} tags - Tags that defines what to do with shape 
	 * additionally.
	 */
	build( ...tags ) {
		
		'use strict';

		var _scope = this;

		console.log(_scope);

		if (tags.indexOf("wait") >= 0) {

			Promise.all( _scope.wait ).then(function() {

				return new Promise( (resolve, reject) => {

					try {

						_scope.mesh.castShadow = true;
						_scope.mesh.receiveShadow = true;

						_scope.mesh.position.set( 
							_scope.position.x, 
							_scope.position.y, 
							_scope.position.z 
						);

						_scope.mesh.rotation.set( 
							_scope.rotation.x, 
							_scope.rotation.y, 
							_scope.rotation.z 
						);

						_scope.mesh.scale.set( 
							_scope.scale.x, 
							_scope.scale.y, 
							_scope.scale.z 
						);

		                //References, I consider this a bad way of solving the problem, but it works for now
		                _scope.position = _scope.mesh.position;
		                _scope.rotation = _scope.mesh.rotation;
		                _scope.scale = _scope.mesh.scale;

						resolve();

					} catch ( err ) {

						console.error( err.message );
						reject();

					}

				});

			});

		} else {

			return new Promise( (resolve, reject) => {

				try {

					_scope.mesh.castShadow = true;
					_scope.mesh.receiveShadow = true;

					_scope.mesh.position.set( 
						_scope.position.x, 
						_scope.position.y, 
						_scope.position.z 
					);

					_scope.mesh.rotation.set( 
						_scope.rotation.x, 
						_scope.rotation.y, 
						_scope.rotation.z 
					);

					_scope.mesh.scale.set( 
						_scope.scale.x, 
						_scope.scale.y, 
						_scope.scale.z 
					);

	                //References, I consider this a bad way of solving the problem, but it works for now
	                _scope.position = _scope.mesh.position;
	                _scope.rotation = _scope.mesh.rotation;
	                _scope.scale = _scope.mesh.scale;

					resolve();

				} catch ( err ) {

					console.error( err.message );
					reject();

				}

			});

		}

		return this;
	}

	/**
	 * Add shape to WHS.World object.
	 *
	 * @param {WHS.World} parent - World, were this shape will be.
	 * @param {...String} tags - Tags for compiling. 
	 */
	addTo( parent, ...tags ) {

		'use strict';

		this.parent = parent;

		var _scope = this;

		if ( tags.indexOf("wait") >= 0 ) {

			Promise.all( _scope.wait ).then(function() {

				return new Promise( (resolve, reject) => {

					try {

						WHS.API.merge( _scope.parent.scene, _scope.mesh );
						_scope.parent.modellingQueue.push( _scope );
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

				});

			});

		} else {

			return new Promise( (resolve, reject) => {

				try {

					WHS.API.merge( _scope.parent.scene, _scope.mesh );
					_scope.parent.modellingQueue.push( _scope );
					_scope.parent.children.push( _scope );

				} catch ( err ) {

					console.error( err.message );
					reject();

				} finally {

					if ( _scope._wait ) {

						_scope._mesh.addEventListener('ready', function() {

							resolve( _scope );
							_scope.emit("ready");

						});

					} else {
						resolve( _scope );

						_scope.emit("ready");
					}

				}

			});
		}
	}

	/**
	 * Initialize shape's material object.
	 */
	_initMaterial(mat_props) {
		
		return WHS.API.loadMaterial(mat_props)._material;
		
	}

	/**
	 * Remove this light from world.
	 */
	remove() {
		
		this.root.scene.remove( this.mesh );

        let index = this.root.modellingQueue.indexOf(this);

        if( index !== -1 )
            this.root.modellingQueue.splice( index, 1 );

        this.root.children.splice( this.root.children.indexOf( this ), 1);
        this.root = null;

		return this;

	}

	/**
	 * Add this light to last applied world.
	 */
	retrieve() {

        this.root = this._lastWorld;
                
		this.root.scene.add( this.mesh );

		return this;

	}

}
