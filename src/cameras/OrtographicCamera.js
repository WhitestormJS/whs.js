import {OrtographicCamera as TOrtographicCamera} from 'three';
import Camera from '../core/Camera';

class OrtographicCamera extends Camera {
  constructor(params = {}) {
    super(params, 'ortographiccamera');

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    return new Promise((resolve) => {
      this.setNative(new TOrtographicCamera(
        params.camera.left,
        params.camera.right,
        params.camera.top,
        params.camera.bottom,
        params.camera.near,
        params.camera.far
      ));

      resolve();
    });
  }
}

export {
  OrtographicCamera as default
};
