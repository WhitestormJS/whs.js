import * as THREE from 'three';
import {Light} from '../core/Light';

class DirectionalLight extends Light {
  constructor(params = {}) {
    super(params, 'directionallight');

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new THREE.DirectionalLight(
        params.light.color,
        params.light.intensity
      );

      if (params.helper) {
        this.helper = new THREE.DirectionalLightHelper(
          this.native,
          params.helper.size ? params.helper.size : 0
        );
      }

      resolve();
    });
  }
}

export {
  DirectionalLight
};
