import * as THREE from 'three';
import {Light} from '../core/Light';

class HemisphereLight extends Light {
  constructor(params = {}) {
    super(params, 'hemispherelight');

    this.build(params);

    super.wrap();
    super.wrapShadow();
  }

  build(params = {}) {
    const _scope = this;

    return new Promise((resolve) => {
      _scope.setNative(new THREE.HemisphereLight(
        params.light.skyColor,
        params.light.groundColor,
        params.light.intensity
      ));

      if (params.helper) {
        _scope.helper = new THREE.HemisphereLightHelper(
          _scope.light,
          params.helper.size ? params.helper.size : 0
        );
      }

      resolve();
    });
  }
}

export {
  HemisphereLight
};
