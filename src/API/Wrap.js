/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/
// DONE:0 Make Wrap function.
WHS.API.Wrap = function (SCOPE, mesh, body) {
  'use strict';

  this._figure = mesh;
  this._object = body;
  this._scope = SCOPE;
  this._key = WHS.objects.length;

  try {
    api.merge(this._scope.root.scene, this._figure);
    if (this._object) api.merge(this._scope.root.world, this._object);

    WHS.objects.push(this._scope);
  }
  catch(err) {
    console.error(err.message);

    this._scope.__deferred.reject();
  }
  finally {
    this._scope.__deferred.resolve();
  }

  return this;
}

WHS.API.Wrap.prototype.remove = function () {
  'use strict';

  this._scope.root.scene.remove(this._figure);
  this._scope.root.world.remove(this._object);

  WHS.objects.splice(this._key, 1);

  return this;
}

WHS.API.Wrap.prototype.retrieve = function () {
  'use strict';

  this._scope.root.scene.add(this._figure);
  this._scope.root.world.add(this._object);

  WHS.objects.push(this._scope);

  return this;
}
