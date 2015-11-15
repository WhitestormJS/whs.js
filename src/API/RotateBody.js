/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Rotate body. Rotates body object *CANNON.JS*.
 *
 * @param {Object} body Body object in *CANNON.JS*. (REQUIRED)
 * @param {Object} rotateSet Object of x, y, z coords. (REQUIRED)
 * @return {Object} Body object in *CANNON.JS*.
 */
WHS.API.rotateBody = function(body, rotateSet) {
  'use strict';

  body.quaternion.x = Math.sin((Math.PI / 180) * rotateSet.x * 0.5);
  body.quaternion.y = Math.sin((Math.PI / 180) * rotateSet.y * 0.5);
  body.quaternion.z = Math.sin((Math.PI / 180) * rotateSet.z * 0.5);
  body.quaternion.w = Math.cos(90 * 0.5);

  return body;
}
