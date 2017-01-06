import {OrthographicCamera as OrthographicCameraNative} from 'three';
import {CameraComponent} from '../../core/CameraComponent';

class OrthographicCamera extends CameraComponent {
  static defaults = {
    ...CameraComponent.defaults,

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
    super(params, OrthographicCamera.defaults);
  }

  build(params = {}) {
    return new OrthographicCameraNative(
      params.camera.left,
      params.camera.right,
      params.camera.top,
      params.camera.bottom,
      params.camera.near,
      params.camera.far
    );
  }
}

export {
  OrthographicCamera
};
