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

      self.foldObject(light, this.params, self.fold.addFolder('light'));
      self.foldObject(light.shadow, this.params.shadow, self.fold.addFolder('shadow'));

      return light;
    },

    onWrap(a, self) {
      self.guiTransforms(this.native, self.fold);
    }
  }
};
