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

  api.def(params.hex, 0x000000); //, this.hex);
  api.def(params.near, 0.015); //, this.near);
  api.def(params.far, 1000); //, this.far);
  api.def(params.density, 0.00025); //, this.density);

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
