/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

// [x]#FIXME:10 Modify def for third parameter.
/**
 * Defines variable. Makes convexPolyhedron object *CANNON.JS* from *THREE.JS* firure.
 *
 * @param {Var} option Variable with value. (REQUIRED)
 * @param {Type} value Value for apply (default). (REQUIRED)
 * @param {Var} variablePoint Variable with value for apply. (OPTIONAL)
 */
WHS.API.def = function(option, value, variablePoint) {
  'use strict';
  if (arguments.length < 2)
    console.error("Something wrong! option? value?");
  else if (arguments.length == 2) {
    option = option || value;
    return option;
  } else if (arguments.length == 3 && variablePoint) {
    variablePoint = option || value;
    return variablePoint;
  }
}
