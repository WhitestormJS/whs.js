import * as THREE from 'three';
import {Component} from '../../core/Component';
import {CameraComponent} from '../../core/CameraComponent';

@CameraComponent
class PerspectiveCamera extends Component {
  constructor(params = {}) {
    super(params, PerspectiveCamera.defaults);

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new THREE.PerspectiveCamera(
        params.camera.fov,
        params.camera.aspect,
        params.camera.near,
        params.camera.far
      );

      resolve();
    });
  }
}

export {
  PerspectiveCamera
};
