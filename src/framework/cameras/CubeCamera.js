import * as THREE from 'three';
import {Camera} from '../core/Camera';

class CubeCamera extends Camera {
  constructor(params = {}) {
    super(params, 'cubecamera');

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new THREE.CubeCamera(
        params.camera.near,
        params.camera.far,
        params.camera.cubeResolution
      );

      resolve();
    });
  }
}

export {
  CubeCamera
};
