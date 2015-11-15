/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * ISSAME.
 *
 * @param {Object} a1 *THREE.JS* face. (REQUIRED)
 * @param {Object} a2 *THREE.JS* face. (REQUIRED)
 * @return {Boolean} thrObj *THREE.JS* geometry.
 */
WHS.API.isSame = function(a1, a2) {
  return !(a1.sort() > a2.sort() || a1.sort() < a2.sort());
}
