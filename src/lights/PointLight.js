import Light from './Light';

class PointLight extends Light {
  /**
   * Point light.
   *
   * @param {Object} params.light.color - Light color.
   * @param {Object} params.light.intensity - Light intensity.
   * @param {Object} params.light.distance - Light distance.
   * @param {Object} params.light.decay - Light decay.
   */
  constructor(params = {}) {
    super(params, 'pointlight');

    this.build(params);

    super.wrap();
    super.wrapShadow();
  }

  build(params = {}) {
    const _scope = this;

    return new Promise((resolve) => {
      _scope.setNative(new THREE.PointLight(
        params.light.color,
        params.light.intensity,
        params.light.distance,
        params.light.decay
      ));

      if (params.helper) {
        _scope.helper = new THREE.PointLightHelper(
          _scope.light,
          params.helper.size ? params.helper.size : 0
        );
      }

      resolve();
    });
  }
}

export {
  PointLight as default
};
