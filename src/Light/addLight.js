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

  var scope = {};

  scope.whsobject = true;

  scope.target = target;
  scope.pos = pos;

  var options = api.def(opts, {});

  api.def(opts.color, 0xffffff, options.color); // Default: white.
  api.def(opts.skyColor, 0xffffff, options.skyColor); // Default: white.
  api.def(opts.groundColor, 0xffffff, options.groundColor); // Default: white.
  api.def(opts.intensity, 1, options.intensity); // Default: 1.
  api.def(opts.distance, 100, options.distance); // Default: 100.
  api.def(opts.angle, Math.PI / 3, options.angle); // Default: 100.

  switch (type) {
    case "ambient":
      scope.light = new THREE.AmbientLight(0xffffff);
      break;

    case "area":
      scope.light = new THREE.AreaLight(options.color, options.intensity);
      console.warn([this.light], "This light only works in the deferredrenderer");
      break;

    case "directional":
      scope.light = new THREE.DirectionalLight(
        options.color,
        options.intensity
      );

      scope.light.castShadow = true;
      scope.light.shadowDarkness = 0.5;
      break;

    case "hemisphere":
      scope.light = new THREE.HemisphereLight(
        options.skyColor,
        options.groundColor,
        options.intensity
      );

      break;

    case "light":
      scope.light = new THREE.Light(options.color);
      break;

    case "point":
      scope.light = new THREE.PointLight(
        options.color,
        options.intensity,
        options.distance
      );

      break;

    case "spot":
      scope.light = new THREE.SpotLight(
        options.color,
        options.intensity,
        options.distance,
        options.angle
      );

      scope.light.castShadow = true;

      // #FIXME:20 Shadow default parameters.
      scope.light.shadowMapWidth = 1024;
      scope.light.shadowMapHeight = 1024;

      scope.light.shadowCameraNear = 50;
      scope.light.shadowCameraFar = 4000;
      scope.light.shadowCameraFov = 30;
      break;
  }

  scope.light.position.set(scope.pos.x, scope.pos.y, scope.pos.z);
  scope.light.shadowCameraVisible = true;

  scope.light.castShadow = true;

  // #FIXME:20 Shadow default parameters.
  scope.light.shadowMapWidth = 1024;
  scope.light.shadowMapHeight = 1024;

  scope.light.shadowCameraNear = 50;
  scope.light.shadowCameraFar = 4000;
  scope.light.shadowCameraFov = 30;


  if(type == "directional")
    var debug = new THREE.DirectionalLightHelper( scope.light, 1 );


  if (scope.light.target)
    scope.light.target.position.set(
      scope.target.x,
      scope.target.y,
      scope.target.z
    );

  WHS.API.merge(this.scene, scope.light);

  if(type == "directional")
    WHS.API.merge(this.scene, debug);

  return scope;
}
