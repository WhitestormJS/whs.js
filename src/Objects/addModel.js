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

    api.JSONLoader().load(pathToModel, function(data) {
        data.computeFaceNormals();
        data.computeVertexNormals();

        // Visualization.
        scope.mesh = new Physijs.ConcaveMesh(data, scope.materialType, options.mass);
        scope._wait = true;

        scope.build();
        scope.wrap = new api.Wrap(scope, scope.mesh);
    });

    return scope;
    
}
