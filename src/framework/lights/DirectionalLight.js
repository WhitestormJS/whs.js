import * as THREE from 'three';
import {Light} from '../core/Light';

class DirectionalLight extends Light {
  constructor(params = {}) {
    super(params, 'directionallight');

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    const _scope = this;

    return new Promise((resolve) => {
      _scope.setNative(new THREE.DirectionalLight(
        params.light.color,
        params.light.intensity
      ));

      if (params.helper) {
        _scope.helper = new THREE.DirectionalLightHelper(
          _scope.light,
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
