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
 * @param {String} options.skyType - Type of sky. Either box or sphere.
 * @returns {Object} scope - Scope.
 */
WHS.init.prototype.addSkybox = function(options) {
  'use strict';
  
  options.skyType = options.skyType || "box";
  options.imgSuffix = options.skyType == "box" ? options.imgSuffix || ".png" : options.imgSuffix || "";
  options.onlyvis = true;

  var scope = new api.construct(this, options, "skybox");

  switch (options.skyType) {
    case "box":
      var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
      var skyGeometry = new THREE.CubeGeometry(this._camera.far, this._camera.far, this._camera.far);
      var matArray = [];

      for (var i = 0; i < 6; i++) {
        matArray.push(new THREE.MeshBasicMaterial({
          map: THREE.ImageUtils.loadTexture(options.src + directions[i] + options.imgSuffix),
          side: THREE.BackSide
        }));
      }

      var skyMat = new THREE.MeshFaceMaterial(matArray);
      var skybox = new THREE.Mesh(skyGeometry, skyMat);

      api.Wrap(scope, skybox, null);

      break;
    case "sphere":
      var vertexShader = [
        "varying vec2 vUV;",
        "",
        "void main() {",
        "vUV = uv;",
        "vec4 pos = vec4(position, 1.0);",
        "gl_Position = projectionMatrix * modelViewMatrix * pos;",
        "}"
      ].join("\n");
      var fragmentShader = [
        "uniform sampler2D texture;",
        "varying vec2 vUV;",
        "",
        "void main() {",
        "vec4 sample = texture2D(texture, vUV);",
        "gl_FragColor = vec4(sample.xyz, sample.w);",
        "}"
      ].join("\n");
      var skyGeometry = new THREE.SphereGeometry(this._camera.far, 60, 40);
      var skyMaterial = new THREE.ShaderMaterial({
        uniforms: {
          texture: {
            type: "t",
            value: THREE.ImageUtils.loadTexture(options.src + options.imgSuffix)
          }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
      });
      var skybox = new THREE.Mesh(skyGeometry, skyMaterial);

      skybox.scale.set(-1, 1, 1);
      skybox.rotation.order = "XZY";
      skybox.renderDepth = 1000.0;

      api.Wrap(scope, skybox, null);

      break;
  }
  return scope;
};
