/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Adds a skybox to the WhitestormJS scene.
 * @param {String} src - Skybox image source.
 * @param {String} imgSuffix - Image suffix (.jpg, .png)
 * @returns {Object} scope - Scope.
 */
WHS.init.prototype.addSkybox = function(src, imgSuffix) {
  'use strict';
  imgSuffix = imgSuffix || ".png";
  var axes = new THREE.AxisHelper(100);
  var scene = this.scene;
  scene.add(axes);
  var imgPrefix = src;
  var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
  var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
  var matArray = [];
  for (var i = 0; i < 6; i++) {
    matArray.push(new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(imgPrefix + directions[i] + imgSuffix),
      side: THREE.BackSide
    }));
  }
  var skyMat = new THREE.MeshFaceMaterial(matArray);
  var skybox = new THREE.Mesh(skyGeometry, skyMat);
  scene.add(skybox);
};
