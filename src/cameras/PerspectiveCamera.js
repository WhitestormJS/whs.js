WHS.PerspectiveCamera = class PerspectiveCamera extends WHS.Camera {

  constructor(params = {}) {

    super(params, 'perspectivecamera');

    this.build(params);

    super.wrap();

  }

  build(params = {}) {

    const _scope = this;

    return new Promise((resolve, reject) => {

      _scope.setNative(new THREE.PerspectiveCamera(
        params.camera.fov,
        params.camera.aspect,
        params.camera.near,
        params.camera.far
      ));

      resolve();

    });

  }

};

WHS.World.prototype.PerspectiveCamera = function (params) {

  const camera = new WHS.PerspectiveCamera(params);
  camera.addTo(this);

  return camera;

};
