WHS.OrtographicCamera = class OrtographicCamera extends WHS.Camera {

  constructor(params = {}) {

    super(params, 'ortographiccamera');

    this.build(params);

    super.wrap();

  }

  build(params = {}) {

    const _scope = this;

    return new Promise((resolve, reject) => {

      _scope.setNative(new THREE.OrtographicCamera(
        params.camera.left,
        params.camera.right,
        params.camera.top,
        params.camera.bottom,
        params.camera.near,
        params.camera.far
      ));

      resolve();

    });

  }

};

WHS.World.prototype.OrtographicCamera = function (params) {

  const camera = new WHS.OrtographicCamera(params);
  camera.addTo(this);

  return camera;

};
