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
// DOING:10 improve libraries support.


/* ================ WHITESTORM|JS ==================== */
var WHS = {
    REVISION: "7",

    API: {},

    _settings: {
        
        assets: "./assets",

        path_worker: '../libs/physijs_worker.js',
        path_ammo: '../libs/ammo.js'
        
    },
    
    loops: [],

    grounds: []
};

var api = WHS.API;


if ( typeof define === 'function' && define.amd ) {

    define( 'whitestorm', WHS );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

    module.exports = WHS;

}
