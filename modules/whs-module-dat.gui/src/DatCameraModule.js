export class DatCameraModule {
  constructor(params = {}) {
    this.params = Object.assign({
      name: 'Unknown camera',
      camera: true,
      gui: false
    }, params);

    this.gui = this.params.gui;
    this.fold = this.gui.addFolder(this.params.name);
  }

  integrate(self) {
    if (this.native) self.bridge.camera.bind(this)(this.native, self);
  }

  foldObject(object, origin, instance = this.fold, onChange = () => {}) {
    for (let key in origin) {
      const value = object[key];
      if (!value) continue;

      if (value.isColor) {
        this.addColor(object, key, instance);
      } else if (typeof origin[key] === 'object') {
        if (object[key] === object) continue;
        this.foldObject(object[key], origin[key], instance.addFolder(key));
      } else {
        const range = '1' + '0'.repeat(value.toString().length);

        instance.add(object, key)
          .min(0)
          .step(range > 10 ? 1 : 0.1)
          .onChange(onChange);
      }
    }
  }

  bridge = {
    camera(camera, self) {
      if (!self.params.camera) return camera;
      self.foldObject(camera, this.params.camera, self.fold.addFolder('camera'), () => {
        camera.updateProjectionMatrix();
      });

      return camera;
    }
  }
};
