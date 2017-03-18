export class DatLightModule {
  constructor(params = {}) {
    this.params = Object.assign({
      name: 'Unknown light',
      light: true,
      shadow: true,
      gui: false
    }, params);

    this.gui = this.params.gui;
    this.fold = this.gui.addFolder(this.params.name);
  }

  addColor(object, property, instance = this.fold) {
    const color = object[property];

    instance.addColor({[property]: color.getHex()}, property).onChange(value => {
      if (typeof value === 'string') value.replace('#', '0x');
      color.setHex(value);
    });
  }

  integrate(self) {
    if (this.native) self.bridge.light.bind(this)(this.native, self);
  }

  foldObject(object, origin, instance = this.fold) {
    for (let key in origin) {
      const value = object[key];
      if (!value) continue;

      if (value.isColor) {
        this.addColor(object, key, instance);
      } else if (typeof origin[key] === 'object') {
        this.foldObject(object[key], origin[key], instance.addFolder(key));
      } else {
        const range = '1' + '0'.repeat(value.toString().length);

        instance.add(object, key)
          .min(0)
          .step(range > 10 ? 1 : 0.1);
      }
    }
  }

  bridge = {
    light(light, self) {
      if (!self.params.light) return light;

      self.foldObject(light, this.params.light, self.fold.addFolder('light'));
      self.foldObject(light.shadow, this.params.shadow, self.fold.addFolder('shadow'));

      return light;
    }
  }
};
