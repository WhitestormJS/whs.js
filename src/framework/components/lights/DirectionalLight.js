import * as THREE from 'three';
import {Component} from '../../core/Component';
import {LightComponent} from '../../core/LightComponent';

@LightComponent
class DirectionalLight extends Component {
  constructor(params = {}) {
    super(params, DirectionalLight.defaults);

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
