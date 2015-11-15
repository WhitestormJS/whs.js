/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * TRIANGULATE.
 *
 * @param {Object} thrObj *THREE.JS* geometry. (REQUIRED)
 * @param {Object} material *THREE.JS* material. (REQUIRED)
 */
WHS.API.Triangulate = function(thrObj, material) {
  'use strict';

  if (arguments.length < 1)
    console.error("No THREE.js geometry");
  else if (arguments.length = 1) {
    var triangles = new WHS.headers.threejs.Geometry();
    var materials = [];

    thrObj.faces.forEach(function(element) {
      var triangle = new WHS.headers.threejs.Geometry();

      [].push.apply(triangle.vertices, [
        thrObj.vertices[element.a],
        thrObj.vertices[element.b],
        thrObj.vertices[element.c]
      ]);

      triangle.faceVertexUvs[0].push([
        new WHS.headers.threejs.Vector2(0, 0),
        new WHS.headers.threejs.Vector2(0, 1),
        new WHS.headers.threejs.Vector2(1, 1),
        new WHS.headers.threejs.Vector2(1, 0),
      ]);

      triangle.faces.push(new WHS.headers.threejs.Face3(0, 1, 2));
      triangle.computeFaceNormals();

      var triangleMesh = new WHS.headers.threejs.Mesh(triangle, material);
      triangleMesh.updateMatrix();

      triangles.merge(triangleMesh.geometry, triangleMesh.matrix);
      materials.push(material);
    });

    var trianglesMesh = new WHS.headers.threejs.Mesh(triangles, new WHS.headers.threejs.MeshFaceMaterial(materials));
    return trianglesMesh;
  }
}
