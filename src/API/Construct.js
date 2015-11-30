/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.API.construct = function (root, params, type) {
  'use strict';

  if (!root)
    console.error("@constructor: WHS root object is not defined.");

  var _set = function(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
  }

  if (params.pos) params.pos.set = _set;
  if (params.rot) params.rot.set = _set;
  if (params.scale) params.scale.set = _set;
  if (params.target) params.target.set = _set;

  var target = $.extend({
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
    }
  }, params);


  var key = 0;

  WHS.objects.forEach(function(el) {
    if (el.type == type) key++;
  });

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
    _target: target.target
  };

  Object.assign(this, scope);

  return this;
}

WHS.API.construct.prototype.build = function (figure, object) {
  'use strict';
  figure = figure || this.visible;
  object = object || this.body;
  var isPhysics = !!(arguments.length == 2 && object);

  // Position.
  figure.position.set(this._pos.x, this._pos.y, this._pos.z);
  if (isPhysics && !this.dtb) object.position.set(
    this._pos.x,
    this._pos.y,
    this._pos.z
  );

  // Rotation.
  figure.rotation.set(this._rot.x, this._rot.y, this._rot.z);
  // TODO: CANNON.JS object rotation.
  //if (isPhysics) object.rotation.set(this._rot.x, this._rot.y, this._rot.z);

  // Scaling.
  figure.scale.set(this._scale.x, this._scale.y, this._scale.z);
  // TODO: CANNON.JS object scaling.
  //object.scale.set(this._rot.x, this._rot.y, this._rot.z);

  return this;
}
