import {DatAPI} from './DatAPI';

export class DatCameraModule extends DatAPI {
  constructor(params = {}, gui) {
    super();

    this.params = Object.assign({
      name: 'Unknown camera',
      camera: true
    }, params);

    this.gui = gui;
    this.fold = this.gui.addFolder(this.params.name);
  }

  integrate(self) {
    if (this.native) self.bridge.camera.bind(this)(this.native, self);
  }

  bridge = {
    camera(camera, self) {
      if (!self.params.camera) return camera;
      self.foldObject(camera, this.params.camera, self.fold, () => {
        camera.updateProjectionMatrix();
      });

      return camera;
    }
  }
};
