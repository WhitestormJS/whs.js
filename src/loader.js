/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

WHS.API.loadJSON = function (url, callback, texturePath) {
    let loader = new THREE.JSONLoader();

    return loader.JSON.load(url, callback, texturePath);
};

WHS.API.loadTexture = function (url, onLoad, onProgress, onError) {
    let loader = new THREE.TextureLoader();

    return loader.Texture.load(url, onLoad, onProgress, onError);
};

WHS.API.loadFont = function (url, onLoad, onProgress, onError) {
    let loader = new THREE.FontLoader();

    return loader.Font.load(url, onLoad, onProgress, onError);
};
