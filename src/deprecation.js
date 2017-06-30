import {Importer} from './components/meshes/Importer';
import {PerspectiveCamera} from './components/cameras/PerspectiveCamera';

export class Model extends Importer {
  constructor(params, ...additional) {
    console.warn('Model is deprecated. Use Importer instead.');

    if (params.geometry) {
      params.url = params.geometry.path;
      params.loader = params.geometry.loader;
    }

    super(params, ...additional);
  }
}

export class CameraModule {
  constructor(params = {}) {
    console.warn('CameraModule is deprecated. Use DefineModule instead.');
    this.camera = new PerspectiveCamera(params);
  }

  integrate(self) {
    this.add(self.camera);
  }

  manager(manager) {
    manager.set('camera', this.camera);
  }
}
