import {Component} from '../core/Component';
import {applyTransform} from '../utils';

export class CameraComponent extends Component {
  build(options) {
    const camera = options.camera;

    applyTransform(camera, options);

    return this.bridge('camera', camera);
  }

  autoSizeUpdate(onUpdate) {
    onUpdate('size', ([width, height]) => {
      this.native.aspect = width / height;
      this.native.updateProjectionMatrix();
    });

    return this;
  }
}

Component.Camera = CameraComponent;
