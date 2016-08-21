import * as THREE from 'three';
import {Light} from '../core/Light';

class PointLight extends Light {
  constructor(params = {}) {
    super(params, 'pointlight');

    this.build(params);

    super.wrap();
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
  PointLight
};
