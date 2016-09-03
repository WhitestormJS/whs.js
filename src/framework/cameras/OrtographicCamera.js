import * as THREE from 'three';
import {Camera} from '../core/Camera';

class OrtographicCamera extends Camera {
  constructor(params = {}, localWindow = window) {
    super(params, 'ortographiccamera');

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.setNative(new THREE.OrtographicCamera(
        params.camera.left,
        params.camera.right,
        params.camera.top,
        params.camera.bottom,
        params.camera.near,
        params.camera.far
      ));

      resolve();
    });
  }
}

export {
  OrtographicCamera
};
