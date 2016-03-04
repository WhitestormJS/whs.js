/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

//WHS.API.construct = function( root, params, type ) {


WHS.Light = class {

	constructor( params, type ) {

		//if ( ! root )
		//console.error( "@constructor: WHS root object is not defined." );

		var _set = function( x, y, z ) {

			this.x = x;
			this.y = y;
			this.z = z;

		}

		if ( params.pos ) params.pos.set = _set;
		if ( params.rot ) params.rot.set = _set;
		if ( params.target ) params.target.set = _set;

		// Polyfill for 3D.
		var target = api.extend(params, {

	        light: {
	        	color: 0xffffff,
	        	skyColor: 0xffffff,
	        	groundColor: 0xffffff,

	        	intensity: 1,
	        	distance: 100,
	        	angle: Math.PI/3
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
			_pos: target.pos,
			_rot: target.rot,
			_target: target.target,

			_light: target.light,
			_shadowmap: target.shadowmap,

			ready: new Events()
		};

		Object.assign( this, scope );

		return this;
	}


	build( ...tags ) {
		
		'use strict';

		var mesh = this.mesh,
		_scope = this;

		this.build_state = new Promise( (resolve, reject) => {

			try {

				mesh.castShadow = true;
				mesh.receiveShadow = true;

				mesh.position.set( this._pos.x, this._pos.y, this._pos.z );
				mesh.rotation.set( this._rot.x, this._rot.y, this._rot.z );

				tags.forEach(tag => {
					_scope[tag] = true;
				});

				resolve();

			} catch ( err ) {

				console.error( err.message );

				reject();

				//this._state.reject();

			}

		});

		return this;
	}


	addTo( root ) {

		'use strict';

		this.root = root;

		var _mesh = this.mesh,
			_scope = this;

		console.log(this);

		this._key = this.root.modellingQueue.length;

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

					_scope.ready.emit("ready");
				}

			}

		} );

		_scope.root.children.push( _scope );

		return this;
	}

	buildShadow() {

	    this.mesh.shadow.mapSize.width = this._shadowmap.width;
	    this.mesh.shadow.mapSize.height = this._shadowmap.height;
	    this.mesh.shadow.bias = this._shadowmap.bias;

	    this.mesh.shadow.camera.near = this._shadowmap.near;
	    this.mesh.shadow.camera.far = this._shadowmap.far;
	    this.mesh.shadow.camera.fov = this._shadowmap.fov;
	    //this.mesh.shadowDarkness = this._shadowmap.darkness;

	    this.mesh.shadow.camera.Left = this._shadowmap.left;
	    this.mesh.shadow.camera.right = this._shadowmap.right;
	    this.mesh.shadow.camera.top = this._shadowmap.top;
	    this.mesh.shadow.camera.bottom = this._shadowmap.bottom;

	}

	remove() {
		
		this.root.scene.remove( this.mesh );

		return this;

	}

	retrieve() {

		this.root.scene.add( this.mesh );

		return this;

	}

}