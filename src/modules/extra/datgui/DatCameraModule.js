import {DatAPI} from './DatAPI';

export class DatCameraModule extends DatAPI {
  constructor(params = {}, gui) {
    super();

    this.params = Object.assign({
      name: 'Unknown camera',
      transforms: true,
      camera: true
    }, params);

    this.gui = gui;
    this.fold = this.gui.addFolder(this.params.name);
  }

  bridge = {
    camera(camera, self) {
      if (!self.params.camera) return camera;
      self.foldObject(camera, this.params, self.fold, () => {
        camera.updateProjectionMatrix();
      });

      return camera;
    },

    onWrap(a, self) {
      self.guiTransforms(this.native, self.fold);
    }
  }
};
