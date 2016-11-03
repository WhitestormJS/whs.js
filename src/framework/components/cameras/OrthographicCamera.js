import {OrthographicCamera as OrthographicCameraNative} from 'three';
import {Component} from '../../core/Component';
import {CameraComponent} from '../../core/CameraComponent';

@CameraComponent
class OrthographicCamera extends Component {
  static defaults = {
    ...Component.defaults,

    camera: {
      near: 1,
      far: 1000,
      left: window.innerWidth / -2,
      right: window.innerWidth / 2,
      top: window.innerHeight / 2,
      bottom: window.innerHeight / -2
    }
  };

  constructor(params = {}) {
    super(params, OrthographicCamera.defaults, OrthographicCamera.instructions);

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new OrthographicCameraNative(
        params.camera.left,
        params.camera.right,
        params.camera.top,
        params.camera.bottom,
        params.camera.near,
        params.camera.far
      );

      resolve();
    });
  }
}

export {
  OrthographicCamera
};
