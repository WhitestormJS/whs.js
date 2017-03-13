import dat from 'dat-gui';
import materials from './materials';

// Polyfill

dat.GUI.prototype.removeFolder = function(name) {
  var folder = this.__folders[name];
  if (!folder) {
    return;
  }
  folder.close();
  this.__ul.removeChild(folder.domElement.parentNode);
  delete this.__folders[name];
  this.onResize();
}

export default class DatGUIModule {
  constructor(params = {}) {
    this.params = Object.assign({
      name: 'Unknown object',
      material: false,
      geometry: false,
      tryMaterial: [],
      custom: {},
      defaults: {},
      range: {},
      step: {}
    }, params);

    this.gui = new dat.GUI();
    this.fold = this.gui.addFolder(this.params.name);
  }

  addColor(object, property, instance = this.fold) {
    const color = object[property];

    instance.addColor({[property]: color.getHex()}, property).onChange(value => {
      if (typeof value === 'string') value.replace('#', '0x');
      color.setHex(value);
    });
  }

  guiMaterial(component, material, instance = this.fold) {
    const paramsProcessor = (params) => {
      for (let key in params) {
        if (params[key] && material[key]) {
          switch (params[key]) {
            case 'color':
              this.addColor(material, key, instance);
              break;
            case 'boolean':
              instance.add(material, key);
              break;
            default:
              instance.add(material, key, params[key]);
          }
        }
      }
    }

    paramsProcessor(materials[material.type]);
    paramsProcessor(materials.any);
  }

  guiGeometry(component, instance = this.fold) {
    for (let key in component.params.geometry) {
      instance.add(component.params.geometry, key)
        .min(0)
        .max(100)
        .step(key.indexOf('Segments') > 0 ? 1 : 0.1)
        .onChange(value => {
          component.g_({[key]: value});
        });
    }
  }

  integrate(self) {
    const {custom, defaults, range, step} = self.params;

    for (let key in custom) {
      if (!this[key] && defaults[key]) this[key] = defaults[key];

      const handler = self.fold.add(this, key);

      if (range[key]) handler.min(range[key][0]).max(range[key][1]);

      if (step[key]) handler.step(step[key]);
      if (custom[key]) handler.onChange(value => custom[key](value, this));
    }
  }

  bridge = {
    material(material, self) {
      if (!self.params.material) return material;

      const makeFolder = (material) => {
        const folder = self.fold.addFolder('material');
        self.guiMaterial(this, material, folder);

        const tryMaterialMap = {};

        const tryMaterialTypes = self.params.tryMaterial.slice().map(value => {
          const type = (new value).type;
          tryMaterialMap[type] = value;
          return type;
        });

        folder.add({tryMaterial: material.type}, 'tryMaterial', tryMaterialTypes).onChange(value => {
          // TODO: Make material update without folder reload.
          this.material = new tryMaterialMap[value](); // .copy(this.material);
          self.fold.removeFolder('material');
          makeFolder(this.material);
        });
      }

      makeFolder(material);

      return material;
    },

    geometry(geometry, self) {
      if (!self.params.geometry) return geometry;
      if (!this.g_) throw new Error('WHS.mesh.DynamicGeometryModule should be used in a component (before gui)');

      const folder = self.fold.addFolder('geometry');
      self.guiGeometry(this, folder);

      return geometry;
    }
  }
}
