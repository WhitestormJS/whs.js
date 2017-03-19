import {OrthographicCamera as OrthographicCameraNative} from 'three';
import {CameraComponent} from '../../core/CameraComponent';
import {system} from '../../polyfill';

class OrthographicCamera extends CameraComponent {
  static defaults = {
    ...CameraComponent.defaults,

    camera: {
      near: 1,
      far: 1000,
      left: system.window.innerWidth / -2,
      right: system.window.innerWidth / 2,
      top: system.window.innerHeight / 2,
      bottom: system.window.innerHeight / -2
    }
  };

  constructor(params = {}) {
    super(params, OrthographicCamera.defaults);
  }

  build(params = {}) {
    return this.applyBridge({camera: new OrthographicCameraNative(
      params.camera.left,
      params.camera.right,
      params.camera.top,
      params.camera.bottom,
      params.camera.near,
      params.camera.far
    )}).camera;
  }
}

export {
  OrthographicCamera
};
