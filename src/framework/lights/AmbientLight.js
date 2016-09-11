import * as THREE from 'three';
import {Light} from '../core/Light';

class AmbientLight extends Light {
  constructor(params = {}) {
    super(params, 'ambientlight');

    this.build(params);
    super.wrap('no-shadows');
  }

  build(params = {}) {
    const _scope = this;

    return new Promise((resolve) => {
      _scope.native = new THREE.AmbientLight(
        params.light.color,
        params.light.intensity
      );

      resolve();
    });
  }
}

export {
  AmbientLight
};
