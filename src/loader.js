WHS.API.loadJSON = function(url, callback, texturePath) { 
    return WHS.loader.JSON.load(url, callback, texturePath) 
};

WHS.API.loadTexture = function(url, onLoad, onProgress, onError) {
    return WHS.loader.Texture.load(url, onLoad, onProgress, onError);
}

WHS.API.loadFont = function(url, onLoad, onProgress, onError) {
    return WHS.loader.Font.load(url, onLoad, onProgress, onError);
}