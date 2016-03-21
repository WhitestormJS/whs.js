/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * ADDFOG.
 *
 * @param {String} type Fog type (name). (REQUIRED)
 * @param {Object} params Options of fog object. (REQUIRED)
 * @returns {Object} This element scope/statement.
 */
WHS.init.prototype.addFog = function(type, params) {
  
  'use strict';

  var scope = {};
  api.extend(params, {
    hex: 0x000000, //Default hex
    near: 0.015, //Default near
    far: 1000, //Default far
    density: 0.00025
  });
  
  switch (type) {
    case "fog":
      scope = new THREE.Fog(params.hex, params.near, params.far);
      break;

    case "fogexp2":
      scope = new THREE.FogExp2(params.hex, params.density);
      break;
  }

  return scope;
}
