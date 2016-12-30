import { PerspectiveCamera } from '../../components/cameras/PerspectiveCamera';

export class CameraModule {
  constructor(params) {
    this.params = Object.assign({
      fov: 75,
      near: 1,
      far: 1000,
      aspect: window.innerWidth / window.innerHeight,

      position: {
        x: 0,
        y: 0,
        z: 0
      }
    }, params);
  }

  integrate(params) {
    this.$camera = new PerspectiveCamera({
      camera: {
        fov: params.fov,
        aspect: params.aspect,
        near: params.near,
        far: params.far
      },

      position: {
        x: params.position.x,
        y: params.position.y,
        z: params.position.z
      }
    });

    this.add(this.$camera);
  }
}
