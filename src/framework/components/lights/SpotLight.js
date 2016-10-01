import * as THREE from 'three';
import {Component} from '../../core/Component';
import {LightComponent} from '../../core/LightComponent';

@LightComponent
class SpotLight extends Component {
  constructor(params = {}) {
    super(params, SpotLight.defaults);

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
