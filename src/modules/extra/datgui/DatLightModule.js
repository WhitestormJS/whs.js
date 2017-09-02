import {DatAPI} from './DatAPI';

export class DatLightModule extends DatAPI {
  constructor(params = {}, gui) {
    super();

    this.params = Object.assign({
      name: 'Unknown light',
      light: true,
      shadow: true,
      transforms: true,
      gui: false
    }, params);

    this.gui = gui;
    this.fold = this.gui.addFolder(this.params.name);
  }

  addColor(object, property, instance = this.fold) {
    const color = object[property];

    instance.addColor({[property]: color.getHex()}, property).onChange(value => {
      if (typeof value === 'string') value.replace('#', '0x');
      color.setHex(value);
    });
  }

  bridge = {
    light(light, self) {
      if (!self.params.light) return light;

      const lightParams = Object.assign({}, this.params);
      delete lightParams.position;
      delete lightParams.rotation;
      delete lightParams.shadow;

      self.foldObject(light, lightParams, self.fold.addFolder('light'));

      if (light.shadow) {
        const shadowFolder = self.fold.addFolder('shadow');
        self.foldObject(light.shadow, this.params.shadow, shadowFolder);

        console.log(light);

        shadowFolder.add(light, 'castShadow');
      }

      return light;
    },

    onWrap(a, self) {
      self.guiTransforms(this.native, self.fold);
    }
  }
};
