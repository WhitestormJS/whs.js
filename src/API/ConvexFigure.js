/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Trimesh figure. Makes convexPolyhedron object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Object} thrObj Figure object *THREE.JS*. (REQUIRED)
 * @returns {Object} - Figure object *CANNON.JS*. (REQUIRED)
 */
WHS.API.ConvexFigure = function(thrObj) {
  'use strict';
  if (arguments.length < 1)
    console.error("No THREE.js geometry");
  else if (arguments.length == 1) {
    var points = new Array();
    var faces = new Array();

    thrObj.vertices.forEach(function(element) {
      points.push(new CANNON.Vec3(element.x, element.y, element.z));
    });

    thrObj.faces.forEach(function(element) {
      faces.push([element.a, element.b, element.c]);
    });

    return new CANNON.ConvexPolyhedron(points, faces);
  }
}
