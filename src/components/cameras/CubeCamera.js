import {CubeCamera as CubeCameraNative} from 'three';
import {CameraComponent} from '../../core/CameraComponent';

class CubeCamera extends CameraComponent {
  static defaults = {
    ...CameraComponent.defaults,

    camera: {
      near: 1,
      far: 1000,
      cubeResolution: 128
    }
  };

  constructor(params = {}) {
    super(params, CubeCamera.defaults);
  }

  build(params = {}) {
    return new CubeCameraNative(
      params.camera.near,
      params.camera.far,
      params.camera.cubeResolution
    );
  }
}

export {
  CubeCamera
};
