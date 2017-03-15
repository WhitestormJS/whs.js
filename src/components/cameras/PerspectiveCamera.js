import {PerspectiveCamera as PerspectiveCameraNative} from 'three';
import {CameraComponent} from '../../core/CameraComponent';
import {system} from '../../polyfill';

class PerspectiveCamera extends CameraComponent {
  static defaults = {
    ...CameraComponent.defaults,

    camera: {
      near: 1,
      far: 1000,
      fov: 45,
      aspect: system.window.innerWidth / system.window.innerHeight
    }
  };

  constructor(params = {}) {
    super(params, PerspectiveCamera.defaults);
  }

  build(params = {}) {
    return this.applyBridge({camera: new PerspectiveCameraNative(
      params.camera.fov,
      params.camera.aspect,
      params.camera.near,
      params.camera.far
    )}).camera;
  }
}

export {
  PerspectiveCamera
};
