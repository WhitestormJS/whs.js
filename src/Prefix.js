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

    loader: {
        JSON: new THREE.JSONLoader(),
        Texture: new THREE.TextureLoader(),
        Font: new THREE.FontLoader()
    },

    API: {},

    _settings: {
        
        assets: "./assets",

        path_worker: '../libs/physijs_worker.js',
        path_ammo: '../libs/ammo.js',
        
    },

    debug: false,
    
    loops: []
};

console.log('WhitestormJS', WHS.REVISION);

WHS.API.loadJSON = function(url, callback, texturePath) { 
    return WHS.loader.JSON.load(url, callback, texturePath) 
};

WHS.API.loadTexture = function(url, onLoad, onProgress, onError) {
    return WHS.loader.Texture.load(url, onLoad, onProgress, onError);
}

WHS.API.loadFont = function(url, onLoad, onProgress, onError) {
    return WHS.loader.Font.load(url, onLoad, onProgress, onError);
}

if ( typeof define === 'function' && define.amd ) {

    define( 'whitestorm', WHS );

} else if ( 'undefined' !== typeof exports && 'undefined' !== typeof module ) {

    module.exports = WHS;

}