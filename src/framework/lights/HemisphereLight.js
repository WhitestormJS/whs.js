import * as THREE from 'three';
import {Component} from '../core/Component';
import LightComponent from '../core/LightComponent';

@LightComponent
class HemisphereLight extends Component {
  constructor(params = {}) {
    super(params, HemisphereLight.defaults);

    this.build(params);

    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new THREE.HemisphereLight(
        params.light.skyColor,
        params.light.groundColor,
        params.light.intensity
      );

      if (params.helper) {
        this.helper = new THREE.HemisphereLightHelper(
          this.native,
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
