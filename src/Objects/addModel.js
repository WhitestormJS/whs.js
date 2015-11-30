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

  var scope = new api.construct(this, options, "model");

  scope.materialType = api.loadMaterial(options.materialOptions)._material;

  //(new THREE.JSONLoader())
  api.JSONLoader().load(pathToModel, function(data) {
    data.computeFaceNormals();
    data.computeVertexNormals();

    // Visualization.
    scope.visible = new THREE.Mesh(data, scope.materialType);


    // Physics.
    if (!options.onlyvis) {
      scope.physic = new WHS.API.TrimeshFigure(data);

      scope.body = new CANNON.Body({
        mass: options.mass
      });

      scope.body.linearDamping = 0.9; //default
      scope.body.addShape(scope.physic);

      scope.body.name = scope.name;
    }

    scope.build(scope.visible, scope.body);
    scope.wrap = new api.Wrap(scope, scope.visible, scope.body);

  });

  return scope;
}
