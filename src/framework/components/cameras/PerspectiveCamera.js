import {PerspectiveCamera as PerspectiveCameraNative} from 'three';
import {Component} from '../../core/Component';
import {CameraComponent} from '../../core/CameraComponent';

@CameraComponent
class PerspectiveCamera extends Component {
  static defaults = {
    ...Component.defaults,

    camera: {
      near: 1,
      far: 1000,
      fov: 45,
      aspect: window.innerWidth / window.innerHeight
    }
  };

  constructor(params = {}) {
    super(params, PerspectiveCamera.defaults, PerspectiveCamera.instructions);

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new PerspectiveCameraNative(
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
