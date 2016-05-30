WHS.CubeCamera = class CubeCamera extends WHS.Camera {

  constructor(params = {}) {

    super(params, 'cubecamera');

    this.build(params);

    super.wrap();

  }

  build(params = {}) {

    const _scope = this;

    return new Promise((resolve, reject) => {

      _scope.setNative(new THREE.CubeCamera(
        params.camera.near,
        params.camera.far,
        params.camera.cubeResolution
      ));

      resolve();

    });

  }

};

WHS.World.prototype.CubeCamera = function (params) {

  const camera = new WHS.CubeCamera(params);
  camera.addTo(this);

  return camera;

};
