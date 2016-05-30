WHS.Light = class extends WHS.Object {
	constructor( params, type ) {

		if ( !type )
			console.error( "@constructor: Please specify \" type \"." );

		var _set = function( x, y, z ) {

			this.x = x;
			this.y = y;
			this.z = z;

		}

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

	wrap( ...tags ) {

		'use strict';

		let _scope = this;

		return new Promise( (resolve, reject) => {

			try {

				if (tags.indexOf("noshadows") < 0) {

					_scope.getNative().castShadow = true;
					_scope.getNative().receiveShadow = true;

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

	addTo( parent ) {

		'use strict';

		this.parent = parent;

		let _helper = this.helper,
			_scope = this;

		return new Promise( (resolve, reject) => {

			try {

				_scope.parent.getScene().add( _scope.getNative() );
				_scope.parent.children.push( _scope );

				if ( _helper ) _scope.parent.getScene().add( _helper );

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

	wrapShadow() {

		let _scope = this;

		return new Promise( (resolve, reject) => {

		    try {

			    _scope.getNative().shadow.mapSize.width = this._shadowmap.width;
			    _scope.getNative().shadow.mapSize.height = this._shadowmap.height;
			    _scope.getNative().shadow.bias = this._shadowmap.bias;

			    _scope.getNative().shadow.camera.near = this._shadowmap.near;
			    _scope.getNative().shadow.camera.far = this._shadowmap.far;
			    _scope.getNative().shadow.camera.fov = this._shadowmap.fov;

			    _scope.getNative().shadow.camera.left = this._shadowmap.left;
			    _scope.getNative().shadow.camera.right = this._shadowmap.right;
			    _scope.getNative().shadow.camera.top = this._shadowmap.top;
			    _scope.getNative().shadow.camera.bottom = this._shadowmap.bottom;

			} catch ( err ) {

				console.error( err.message );
				reject();

			} finally {

				resolve( _scope );

			}

		});

	}

	clone() {

		return new WHS.Light( this.__params, this._type ).copy( this );

	}

	copy( source ) {

		this.light = source.getNative().clone();
		if ( source.helper ) this.helper = source.helper.clone();

		this.wrap();

		this.position = source.position.clone();
		this.rotation = source.rotation.clone();

		this._type = source._type;

		return this;

	}

	remove() {

		this.parent.getScene().remove( this.getNative() );
		if ( source.helper ) this.parent.getScene().remove( this.helper );

        this.parent.children.splice( this.parent.children.indexOf( this ), 1);
        this.parent = null;

        this.emit("remove");

		return this;

	}

	setNative( light ) {

		return native.set( this, light );

	}

	getNative() {

		return native.get( this );

	}

	get position() {
		return this.getNative().position;
	}

	set position( vector3 ) {
		return this.getNative().position.copy( vector3 );
	}

	get rotation() {
		return this.getNative().rotation;
	}

	set rotation( euler ) {
		return this.getNative().rotation.copy( euler );
	}

	get target() {
		return this.getNative().target.position;
	}

	set target( vector3 ) {
		return this.getNative().target.position.copy( vector3 );
	}

	follow( curve, time = 1000, loop, lookAt ) {

		let _scope = this,
		gEnd = time;

		let animation = new WHS.loop( clock => {

			let u =  clock.getElapsedTime() * 1000 / gEnd;
			let vec1 = curve.getPoint( u );
			let vec2 = curve.getPoint( (u + 0.01) % 1 );

			_scope.position.set( vec1.x, vec1.y, vec1.z );

			if ( !lookAt ) _scope.lookAt( vec2 );
			else if ( lookAt instanceof THREE.Vector3 ) _scope.lookAt( lookAt );
			else if ( lookAt instanceof THREE.Curve ||
					  lookAt instanceof THREE.CurvePath ) {

				 _scope.lookAt( lookAt.getPoint( u ) );

			}

		});

		animation.start();

		if ( loop )	setInterval( () => {
				animation.stop();

				animation = new WHS.loop( clock => {

					let u =  clock.getElapsedTime() * 1000 / gEnd;
					let vec1 = curve.getPoint( u );
					let vec2 = curve.getPoint( (u + 0.01) % 1 );

					_scope.position.set( vec1.x, vec1.y, vec1.z );

					if ( !lookAt ) _scope.lookAt( vec2 );
					else if ( lookAt instanceof THREE.Vector3 ) _scope.lookAt( lookAt );
					else if ( lookAt instanceof THREE.Curve ||
							  lookAt instanceof THREE.CurvePath ) {

						 _scope.lookAt( lookAt.getPoint( u ) );

					}

				});

				animation.start();
			}, time);

		else setTimeout( () => {
				animation.stop()
		}, time);
	}

}
