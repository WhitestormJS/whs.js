/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Adds a skybox to the WhitestormJS scene.
 * @param {Object} options - Skybox options.
 * @param {String} options.src - Skybox image source.
 * @param {String} options.imgSuffix - Skybox image suffix (.png, .jpg, etc.)
 * @returns {Object} scope - Scope.
 */
WHS.init.prototype.addSkybox = function(options) {
  'use strict';

  options.imgSuffix = options.imgSuffix || ".png";
  options.onlyvis = true;
  var scope = new api.construct(this, options, "skybox");

  var axes = new THREE.AxisHelper(100);
  var scene = this.scene;
  var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
  var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
  var matArray = [];

  scene.add(axes);

  for (var i = 0; i < 6; i++) {
    matArray.push(new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture(options.src + directions[i] + options.imgSuffix),
      side: THREE.BackSide
    }));
  }

  var skyMat = new THREE.MeshFaceMaterial(matArray);
  var skybox = new THREE.Mesh(skyGeometry, skyMat);

  scene.add(skybox);

  return scope;
};
