import * as THREE from 'three';
import {Component} from '../../core/Component';
import {CameraComponent} from '../../core/CameraComponent';

@CameraComponent
class CubeCamera extends Component {
  constructor(params = {}) {
    super(params, CubeCamera.defaults, CubeCamera.instructions);

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
