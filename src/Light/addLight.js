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
      scope.visible = new THREE.AmbientLight(0xffffff);
      break;

    case "area":
      scope.visible = new THREE.AreaLight(options.color, options.intensity);
      console.warn([this.visible], "This light only works in the deferredrenderer");
      break;

    case "directional":
      scope.visible = new THREE.DirectionalLight(
        options.color,
        options.intensity
      );

      break;

    case "hemisphere":
      scope.visible = new THREE.HemisphereLight(
        options.skyColor,
        options.groundColor,
        options.intensity
      );

      break;

    case "light":
      scope.visible = new THREE.Light(options.color);

      break;

    case "point":
      scope.visible = new THREE.PointLight(
        options.color,
        options.intensity,
        options.distance
      );

      //scope.visible.visible = false;

      break;

    case "spot":
      scope.visible = new THREE.SpotLight(
        options.color,
        options.intensity,
        options.distance,
        options.angle
      );

      break;
  }

  //scope.visible.shadowCameraVisible = true;

  scope.visible.castShadow = true;

  // #FIXME:20 Shadow default parameters.
  scope.visible.shadowMapWidth = 1024;
  scope.visible.shadowMapHeight = 1024;
  scope.visible.shadowBias = 0.001;

  scope.visible.shadowCameraNear = true;
  scope.visible.shadowCameraFar = 400;
  scope.visible.shadowCameraFov = 60;
  scope.visible.shadowDarkness = 0.3;

  var d = 200;

  scope.visible.shadowCameraLeft = -d;
  scope.visible.shadowCameraRight = d;
  scope.visible.shadowCameraTop = d;
  scope.visible.shadowCameraBottom = -d;


  if (scope.visible.target)
    scope.visible.target.position.set(
      scope._target.x,
      scope._target.y,
      scope._target.z
    );

  scope.build();
  scope.wrap = api.Wrap(scope, scope.visible);

  return scope;
};
