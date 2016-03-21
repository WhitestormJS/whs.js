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

		//if ( ! root )
		//console.error( "@constructor: WHS root object is not defined." );

		var _set = function( x, y, z ) {

			this.x = x;
			this.y = y;
			this.z = z;

		}

		// Polyfill for 3D.
		api.extend(params, {

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

			onlyvis: false

		} );


		var key = 0;

		/*root.modellingQueue.forEach( function( el ) {

			if ( el.type == type ) key ++;

		} );*/

		var scope = {
			_key: key,
			_type: type,
			_whsobject: true,
			_name: type + key,
			__releaseTime: new Date().getTime(),
			_pos: params.pos,
			_rot: params.rot,
			_scale: params.scale,
			_morph: params.morph,
			_target: params.target,
			_onlyvis: params.onlyvis,

			ready: new Events()
		};

		Object.assign( this, scope );

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

		console.log(this);

		var _scope = this;

		if (tags.indexOf("wait") >= 0) {

			_scope._loading.then(function() {

				_scope.build_state = new Promise( (resolve, reject) => {

					try {

						_scope.mesh.castShadow = true;
						_scope.mesh.receiveShadow = true;

						_scope.mesh.position.set( _scope._pos.x, _scope._pos.y, _scope._pos.z );
						_scope.mesh.rotation.set( _scope._rot.x, _scope._rot.y, _scope._rot.z );
						_scope.mesh.scale.set( _scope._scale.x, _scope._scale.y, _scope._scale.z );

		                //References, I consider this a bad way of solving the problem, but it works for now
		                _scope._pos = _scope.mesh.position;
		                _scope._rot = _scope.mesh.rotation;
		                _scope._scale = _scope.mesh.scale;

						resolve();

					} catch ( err ) {

						console.error( err.message );

						reject();

						//this._state.reject();

					}

				});

			});

		} else {
			_scope.build_state = new Promise( (resolve, reject) => {

				try {

					_scope.mesh.castShadow = true;
					_scope.mesh.receiveShadow = true;

					_scope.mesh.position.set( _scope._pos.x, _scope._pos.y, _scope._pos.z );
					_scope.mesh.rotation.set( _scope._rot.x, _scope._rot.y, _scope._rot.z );
					_scope.mesh.scale.set( _scope._scale.x, _scope._scale.y, _scope._scale.z );

                    //References, I consider this a bad way of solving the problem, but it works for now
                    _scope._pos = _scope.mesh.position;
                    _scope._rot = _scope.mesh.rotation;
                    _scope._scale = _scope.mesh.scale;

					resolve();

				} catch ( err ) {

					console.error( err.message );

					reject();

					//this._state.reject();

				}

			});
		}

		return this;
	}

	/**
	 * Add shape to WHS.World object.
	 *
	 * @param {WHS.World} root - World, were this shape will be. 
	 */
	addTo( root, ...tags ) {

		'use strict';

		this.root = root;

		var _mesh = this.mesh,
			_scope = this;


		this._key = this.root.modellingQueue.length;

		console.log([tags, tags.indexOf("wait"), _scope]);

		if (tags.indexOf("wait") >= 0) {
			_scope._loading.then(function() {

				_scope._state = new Promise( (resolve, reject) => {

					try {

						api.merge( _scope.root.scene, _scope.mesh );
						_scope.root.modellingQueue.push( _scope );

					} catch ( err ) {

						console.error( err.message );
						reject();

					} finally {

						if ( _scope._wait ) {

							_scope._mesh.addEventListener( 'ready', function() {
								resolve();

								_scope.ready.emit("ready");
							} );

						} else {
							resolve();

							_scope.ready.emit("ready");
						}

					}

				} );

			} );
		} else {

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

							_scope.ready.emit("ready");
						} );

					} else {
						resolve();

						console.log("wqd");

						_scope.ready.emit("ready");
					}

				}

			} );
		}

		_scope.root.children.push( _scope );

		return this;
	}

	/**
	 * Initialize shape's material object.
	 */
	_initMaterial(mat_props) {
		
		return api.loadMaterial(mat_props)._material;
		
	}

	/**
	 * Remove this light from world.
	 */
        let _lastWorld = this.root;
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

                this.root = _lastWorld;
                
		this.root.scene.add( this.mesh );

		return this;

	}

}
