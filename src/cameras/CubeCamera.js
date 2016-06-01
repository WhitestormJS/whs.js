import {CubeCamera as TCubeCamera} from 'three';
import Camera from '../core/Camera';

class CubeCamera extends Camera {
  constructor(params = {}) {
    super(params, 'cubecamera');

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promse((resolve) => {
      this.setNative(new TCubeCamera(
        params.camera.near,
        params.camera.far,
        params.camera.cubeResolution
      ));

      resolve();
    });
  }
}

export {
  CubeCamera as default
};
