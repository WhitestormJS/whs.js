import * as THREE from 'three';
import {Light} from '../core/Light';

class SpotLight extends Light {
  constructor(params = {}) {
    super(params, 'spotlight');

    this.build(params);

    super.wrap();
  }

  build(params = {}) {
    const _scope = this;

    return new Promise((resolve) => {
      _scope.setNative(new THREE.SpotLight(
        params.light.color,
        params.light.intensity,
        params.light.distance,
        params.light.angle,
        params.light.exponent,
        params.light.decay
      ));

      if (params.helper)
        _scope.helper = new THREE.SpotLightHelper(_scope.light);

      resolve();
    });
  }
}

export {
  SpotLight
};
