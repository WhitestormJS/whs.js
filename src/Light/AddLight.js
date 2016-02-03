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
WHS.init.prototype.addLight = function(type, opts) {

    'use strict';

    var scope = new api.construct(this, opts, type);

    //Do not need the option variable, opts is by this statement, gained default values
    api.extend(opts, {
        color: 0xffffff,
        skyColor: 0xffffff,
        groundColor: 0xffffff,

        intensity: 1,
        distance: 100,
        angle: Math.PI/3,

        shadowmap: {
            cast: true,

            bias: 0.0001,

            width: 1024,
            height: 1024,

            near: true,
            far: 400,
            fov: 60,
            darkness: 0.3,

            top: 200,
            bottom: -200,
            left: -200,
            right: 200
        }
    });

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

    scope.mesh.castShadow = opts.shadowmap.cast;

    // #FIXME:20 Shadow default parameters.
    scope.mesh.shadowMapWidth = opts.shadowmap.width;
    scope.mesh.shadowMapHeight = opts.shadowmap.height;
    scope.mesh.shadowBias = opts.shadowmap.bias;

    scope.mesh.shadowCameraNear = opts.shadowmap.near;
    scope.mesh.shadowCameraFar = opts.shadowmap.far;
    scope.mesh.shadowCameraFov = opts.shadowmap.fov;
    scope.mesh.shadowDarkness = opts.shadowmap.darkness;

    scope.mesh.shadowCameraLeft = opts.shadowmap.left;
    scope.mesh.shadowCameraRight = opts.shadowmap.right;
    scope.mesh.shadowCameraTop = opts.shadowmap.top;
    scope.mesh.shadowCameraBottom = opts.shadowmap.bottom;


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
