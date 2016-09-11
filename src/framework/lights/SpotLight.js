import * as THREE from 'three';
import {Light} from '../core/Light';

class SpotLight extends Light {
  constructor(params = {}) {
    super(params, 'spotlight');

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new THREE.SpotLight(
        params.light.color,
        params.light.intensity,
        params.light.distance,
        params.light.angle,
        params.light.exponent,
        params.light.decay
      );

      if (params.helper)
        this.helper = new THREE.SpotLightHelper(this.native);

      resolve();
    });
  }
}

export {
  SpotLight
};
