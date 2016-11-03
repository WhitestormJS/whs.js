import {CubeCamera as CubeCameraNative} from 'three';
import {Component} from '../../core/Component';
import {CameraComponent} from '../../core/CameraComponent';

@CameraComponent
class CubeCamera extends Component {
  static defaults = {
    ...Component.defaults,

    camera: {
      near: 1,
      far: 1000,
      cubeResolution: 128
    }
  };

  constructor(params = {}) {
    super(params, CubeCamera.defaults, CubeCamera.instructions);

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.native = new CubeCameraNative(
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
