/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * MERGE.
 *
 * @param {Object} box Object to be merged. (REQUIRED)
 * @param {Object} rabbits Object to be added. (REQUIRED)
 */
WHS.API.merge = function(box, rabbits) {
  'use strict';
  if (arguments.length < 2)
    console.error("No rabbits for the box. (arguments)", [box, rabbits]);
  else if (arguments.length == 2) {
    if (Array.isArray(rabbits) && rabbits.length <= 1)
      box.add(rabbits[0]);
    else if (Array.isArray(rabbits) && rabbits.length >= 2) {
      for (var i = 0; i < rabbits.length; i++) {
        box.add(rabbits[i]);
      }
    } else if (!Array.isArray(rabbits) && box)
      box.add(rabbits);
    else
    // #FIXME:0 Fix caller function line number.
      console.error("box is undefined. Line " + (new Error).lineNumber + ". Func merge.", [box, rabbits]);
  }
}
