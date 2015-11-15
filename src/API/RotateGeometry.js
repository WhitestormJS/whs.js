/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * ROTATEGEOMETRY.
 *
 * @param {Object} geometry *THREE.JS* geometry. (REQUIRED)
 * @param {Object} rotateSet Rotation x/y/z. (REQUIRED)
 * @return {Object} *THREE.JS* geometry.
 */
WHS.API.rotateGeometry = function(geometry, rotateSet) {
  var rotationMatrix = new WHS.headers.threejs.Matrix4();
  rotationMatrix.makeRotationFromEuler(new WHS.headers.threejs.Euler(rotateSet.x, rotateSet.y, rotateSet.z, 'XYZ'));

  for (var v in geometry.vertices) {
    geometry.vertices[v].applyMatrix4(rotationMatrix);
  }

  return geometry;
}
