/**
 * © Alexander Buzin, 2014-2015
 * Site: http://alexbuzin.me/
 * Email: alexbuzin88@gmail.com
*/

/**
 * Light.
 *
 * @param {String} type Light type. (REQUIRED)
 * @param {Object} opts Parameters of light dot. (OPTIONAL)
 * @param {Object} pos Position of light dot. (OPTIONAL)
 * @param {Object} target Target of light dot. (OPTIONAL)
 * @return {Object} Scope.
 */
WHS.init.prototype.addLight = function(type, opts, pos, target) {
  // #TODO:160 add lights.

  // TODO: fix options problem.
  var scope = new api.construct(this, {pos: pos}, type);

  scope.skip = true;

  var options = api.def(opts, {});

  api.def(opts.color, 0xffffff, options.color); // Default: white.
  api.def(opts.skyColor, 0xffffff, options.skyColor); // Default: white.
  api.def(opts.groundColor, 0xffffff, options.groundColor); // Default: white.
  api.def(opts.intensity, 1, options.intensity); // Default: 1.
  api.def(opts.distance, 100, options.distance); // Default: 100.
  api.def(opts.angle, Math.PI / 3, options.angle); // Default: 100.

  switch (type) {
    case "ambient":
      scope.mesh = new THREE.AmbientLight(0xffffff);
      break;

    case "area":
      scope.mesh = new THREE.AreaLight(options.color, options.intensity);
      console.warn([this.visible], "This light only works in the deferredrenderer");
      break;

    case "directional":
      scope.mesh = new THREE.DirectionalLight(
        options.color,
        options.intensity
      );

      break;

    case "hemisphere":
      scope.mesh = new THREE.HemisphereLight(
        options.skyColor,
        options.groundColor,
        options.intensity
      );

      break;

    case "light":
      scope.mesh = new THREE.Light(options.color);

      break;

    case "point":
      scope.mesh = new THREE.PointLight(
        options.color,
        options.intensity,
        options.distance
      );

      //scope.mesh.visible = false;

      break;

    case "spot":
      scope.mesh = new THREE.SpotLight(
        options.color,
        options.intensity,
        options.distance,
        options.angle
      );

      break;
  }

  //scope.mesh.shadowCameraVisible = true;

  scope.mesh.castShadow = true;

  // #FIXME:20 Shadow default parameters.
  scope.mesh.shadowMapWidth = 1024;
  scope.mesh.shadowMapHeight = 1024;
  scope.mesh.shadowBias = 0.0001;

  scope.mesh.shadowCameraNear = true;
  scope.mesh.shadowCameraFar = 400;
  scope.mesh.shadowCameraFov = 60;
  scope.mesh.shadowDarkness = 0.3;

  var d = 200;

  scope.mesh.shadowCameraLeft = -d;
  scope.mesh.shadowCameraRight = d;
  scope.mesh.shadowCameraTop = d;
  scope.mesh.shadowCameraBottom = -d;


  if (scope.mesh.target)
    scope.mesh.target.position.set(
      scope._target.x,
      scope._target.y,
      scope._target.z
    );

  scope.build();
  scope.wrap = api.Wrap(scope, scope.mesh);

  return scope;
};
