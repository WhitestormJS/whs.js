/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Shape. Makes *THREE.JS* shape.
 *
 * @param {Object} pos Position x/y/z.
 * @param {Number} diff Intersect line length from top.
 * @param {Object} terrain *WHS* terrain object.
 * @returns {Object} Intersect array.
 */
WHS.API.getheight = function(pos, diff, terrain) {
  'use strict';

  diff = diff || 1000;

  this.raycaster = new WHS.headers.threejs.Raycaster(
    new WHS.headers.threejs.Vector3(pos.x, diff, pos.y),
    new WHS.headers.threejs.Vector3(0, -1, 0).normalize()
  );

  this.intersect = this.raycaster.intersectObject(terrain.visible);

  return this.intersect;
}
