/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * ORBITCONTROLS.
 *
 * @param {Object} object Description. (OPTIONAL)
 */
WHS.init.prototype.OrbitControls = function(object) {
  // #TODO:180 add use for object.
  this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
}
