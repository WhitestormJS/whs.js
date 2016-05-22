/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

var WHS = {
    REVISION: "r8",

    API: {},

    _settings: {
        
        assets: "./assets",

        path_worker: '../libs/physijs_worker.js',
        path_ammo: '../libs/ammo.js',
        
    },

    debug: false,
    
    loops: []
};

if ( typeof define === 'function' && define.amd ) {

    define( 'whitestorm', WHS );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

    module.exports = WHS;

}