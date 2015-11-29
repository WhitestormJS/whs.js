/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/
// DONE:0 Make Wrap function.
WHS.API.Wrap = function (SCOPE, mesh, body) {
  'use strict';

  var scope = {
    _figure: mesh,
    _object: body,
    _scope: SCOPE,
    _key: WHS.objects.length
  };

  api.merge(scope._scope.root.scene, scope._figure);
  if (scope._object) api.merge(scope._scope.root.world, scope._object);

  WHS.objects.push(scope._scope);

  return scope;
}

WHS.API.Wrap.prototype.remove = function () {
  this._scope.root.scene.remove(this._figure);
  this._scope.root.world.remove(this._object);

  WHS.objects.splice(this._key, 1);

  return this;
}

WHS.API.Wrap.prototype.retrieve = function () {
  this._scope.root.scene.add(this._figure);
  this._scope.root.world.add(this._object);

  WHS.objects.push(this._scope);

  return this;
}
