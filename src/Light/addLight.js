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
  var scope = new api.construct(this, {pos}, type);

  scope.skip = true;
  //Do not need the option variable, opts is by this statement, gained default values
  WHS.API.extend(opts, {color: 0xffffff, //Default while
                        skyColor: 0xffffff, //Default white
                        groundColor: 0xffffff, //Default white
                        intensity: 1, //Default 1
                        distance: 100, //Default 100
                        angle: Math.PI/3}) //Default PI/3
  switch (type) {
    case "ambient":
      scope.mesh = new THREE.AmbientLight(0xffffff);
      break;

    case "directional":
      scope.mesh = new THREE.DirectionalLight(
        opts.color,
        opts.intensity
      );

      break;

    case "hemisphere":
      scope.mesh = new THREE.HemisphereLight(
        opts.skyColor,
        opts.groundColor,
        opts.intensity
      );

      break;

    case "light":
      scope.mesh = new THREE.Light(opts.color);

      break;

    case "point":
      scope.mesh = new THREE.PointLight(
        opts.color,
        opts.intensity,
        opts.distance
      );

      //scope.mesh.visible = false;

      break;

    case "spot":
      scope.mesh = new THREE.SpotLight(
        opts.color,
        opts.intensity,
        opts.distance,
        opts.angle
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
