/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

// [x]#TODO:130 RESTRUCTURIZE.
// [x]#TODO:120 RESTRUCTURIZE threejs and cannonjs library calling.
// [x]#DONE:30 Add stats.
// #TODO:10 Add http://underscorejs.org/.
// DONE:20 clean all console.logs.
// DOING:0 Wagner.base.js is not a part of library.
// FIXME: Fix fog.

/* ================ MODERNIZING BROWSER API IF NOT EXIST ========================== */

if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(obj) {
    'use strict';
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
}

/* ================ WHITESTORM|JS ================================================= */
var WHS = {
  REVISION: "0.0.4"
};

WHS.headers = {}; //GLOBAL headers, ex: url, script, library, specific api...
WHS.API = {};
WHS.ADD = {}; // some figures or shape funcs;
WHS.objects = [];
WHS.grounds = [];

var api = WHS.API;

if ( typeof define === 'function' && define.amd ) {

		define( 'whitestorm', WHS );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

		module.exports = WHS;

}
