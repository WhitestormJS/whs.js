import {PerspectiveCamera} from '../../components/cameras/PerspectiveCamera';

export class CameraModule {
  constructor(params = {}) {
    this.params = Object.assign({
      fov: 75,
      near: 1,
      far: 1000,

      position: {
        x: 0,
        y: 0,
        z: 0
      }
    }, params);

    this.camera = new PerspectiveCamera({
      camera: {
        fov: this.params.fov,
        aspect: this.params.aspect,
        near: this.params.near,
        far: this.params.far
      },

      position: {
        x: this.params.position.x,
        y: this.params.position.y,
        z: this.params.position.z
      }
    });
  }

  integrate(self) {
    this.add(self.camera);
  }

  manager(manager) {
    manager.add('camera', this.camera, {alias: '$camera'});
  }
}
