import * as THREE from 'three';
import {Light} from '../core/Light';

class PointLight extends Light {
  constructor(params = {}) {
    super(params, 'pointlight');

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new THREE.PointLight(
        params.light.color,
        params.light.intensity,
        params.light.distance,
        params.light.decay
      );

      if (params.helper) {
        this.helper = new THREE.PointLightHelper(
          this.native,
          params.helper.size ? params.helper.size : 0
        );
      }

      resolve();
    });
  }
}

export {
  PointLight
};
