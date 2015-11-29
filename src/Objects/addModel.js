/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

// #DONE:40 addModel *func*.
/**
 * MODEL.
 *
 * @param {String} pathToModel path to JSON model. (REQUIRED)
 * @param {Object} options Figure options. (REQUIRED)
 * @return {Object} Scope.
 */
WHS.init.prototype.addModel = function(pathToModel, options) {
  'use strict';

  var scope = {}; // INIT LOCAL SCOPE.

  scope.root = this;

  var opt = {};

  scope.whsobject = true;
  scope.releaseTime = new Date().getTime();

  opt.color = options.color || 0xffffff;
  opt.mass = options.mass || 0;

  opt.pos = typeof options.pos == "object" ? options.pos : {
    x: 0,
    y: 0,
    z: 0
  };

  opt.rot = typeof options.pos == "object" ? options.pos : {
    x: 0,
    y: 0,
    z: 0
  };

  opt.material = options.materialOptions || {};
  opt.geometry = options.geometryOptions || {};

  scope.materialType = api.loadMaterial(opt.material)._material;

  var key = 0;

  WHS.objects.forEach(function(el) {
    if (el.type == "model") {
      key++;
    }
  });

  scope.type = "model";
  scope.name = opt.name || "model" + key;

  //(new THREE.JSONLoader())
  api.JSONLoader().load(pathToModel, function(data) {
    data.computeFaceNormals();
    data.computeVertexNormals();

    // Visualization.
    scope.visible = new THREE.Mesh(data, scope.materialType);
    scope.visible.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
    scope.visible.rotation.set(
      (Math.PI / 180) * opt.rot.x,
      (Math.PI / 180) * opt.rot.y,
      (Math.PI / 180) * opt.rot.z
    );

    // Physics.
    if (!options.onlyvis) {
      scope.physic = new WHS.API.TrimeshFigure(data);

      scope.body = new CANNON.Body({
        mass: opt.mass
      });

      scope.body.linearDamping = 0.9; //default
      scope.body.addShape(scope.physic);
      scope.body.position.set(opt.pos.x, opt.pos.y, opt.pos.z);
      scope.body.quaternion.copy(scope.visible.quaternion);
      scope.body.name = scope.name;
    }

    scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

  });

  return scope;
}
