import { PerspectiveCamera } from '../../components/cameras/PerspectiveCamera';

export class CameraModule {
  integrate() {
    const _params = this.params;

    this.$camera = new PerspectiveCamera({
      camera: {
        fov: _params.camera.fov,
        aspect: _params.width / _params.height,
        near: _params.camera.near,
        far: _params.camera.far
      },

      position: {
        x: _params.camera.position.x,
        y: _params.camera.position.y,
        z: _params.camera.position.z
      }
    });

    this.$camera.addTo(this);
  }
}
