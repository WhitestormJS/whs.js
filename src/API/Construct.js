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

	var target = $.extend( true, {
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
	}, params );


	var key = 0;

	root.modellingQueue.forEach( function( el ) {

		if ( el.type == type ) key ++;

	} );

	var deferred = $.Deferred();

	var scope = {
		root: root,
		_key: key,
		_whsobject: true,
		_name: type + key,
		__releaseTime: new Date().getTime(),
		__deferred: deferred,
		_state: deferred.promise(),
		_pos: target.pos,
		_rot: target.rot,
		_scale: target.scale,
		_morph: target.morph,
		_target: target.target,
		_onlyvis: target.onlyvis
	};

	Object.assign( this, scope );

	root.children.push( scope );

	return this;

}

WHS.API.construct.prototype.build = function( mesh ) {
	
	'use strict';

	mesh = mesh || this.mesh;

	try {

		// Shadowmap.
		mesh.castShadow = true;
		mesh.receiveShadow = true;

		// Position.
		mesh.position.set( this._pos.x, this._pos.y, this._pos.z );

		// Rotation.
		mesh.rotation.set( this._rot.x, this._rot.y, this._rot.z );
		// TODO: CANNON.JS object rotation.
		//if (isPhysics) object.rotation.set(this._rot.x, this._rot.y, this._rot.z);

		// Scaling.
		mesh.scale.set( this._scale.x, this._scale.y, this._scale.z );
		// TODO: CANNON.JS object scaling.
		//object.scale.set(this._rot.x, this._rot.y, this._rot.z);

	} catch ( err ) {

		console.error( err.message );

		this.__deferred.reject();

	}

	return this;

}
