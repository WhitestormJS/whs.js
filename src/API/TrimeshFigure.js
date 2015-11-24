/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

// #TODO:110 Heights array.
/**
 * Trimesh figure. Makes trimesh object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 * @param {Boolean} heightsNeed true if heights need. (OPTIONAL)
 */
WHS.API.TrimeshFigure = function(thrObj, heightsNeed) {
  'use strict';

  if (arguments.length < 1)
    console.error("No THREE.js geometry");
  else if (arguments.length == 1) {
    var points = [];
    var faces = [];
    var heights = [];

    thrObj.vertices.forEach(function(element) {
      points.push(element.x);
      points.push(element.y);
      points.push(element.z);

      if (heightsNeed) {
        heights.push({
          x: element.x,
          y: element.y,
          z: element.z
        });
      }
    });

    thrObj.faces.forEach(function(element) {
      faces.push(element.a);
      faces.push(element.b);
      faces.push(element.c);
    });

    var canObj = new CANNON.Trimesh(points, faces);
    canObj.updateNormals();
    canObj.heightsValues = heights;

    return canObj;

  }
}
