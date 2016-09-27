import * as THREE from 'three';
import {Component} from '../core/Component';
import LightComponent from '../core/LightComponent';

@LightComponent
class AmbientLight extends Component {
  constructor(params = {}) {
    super(params, AmbientLight.defaults);

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
