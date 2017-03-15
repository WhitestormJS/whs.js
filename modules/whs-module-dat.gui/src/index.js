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

class DatMeshModule {
  constructor(params = {}) {
    this.params = Object.assign({
      name: 'Unknown object',
      geometry: true,
      material: true,
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
    if (!component.g_) throw new Error('DatGUIModule requires WHS.mesh.DynamicGeometryModule for geometry updates.');

    const geomParams = component.params.geometry;
    const geomData = this.params.geometry;

    for (let key in geomParams) {
      const data = geomData[key];

      const range = data && data.range ? data.range : [0, 100];

      instance.add(geomParams, key)
        .min(range[0])
        .max(range[1])
        .step(key.indexOf('Segments') > 0 ? 1 : 0.1)
        .onChange(value => {
          component.g_({[key]: value});
        });
    }
  }

  integrate(self) {
    if (this.native) {
      self.bridge.material.bind(this)(this.native.material, self);
      self.bridge.geometry.bind(this)(this.native.geometry, self);
    }
  }

  bridge = {
    material(material, self) {
      if (!self.params.material) return material;

      const makeFolder = (material) => {
        const folder = self.fold.addFolder('material');
        self.guiMaterial(this, material, folder);
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
};

class DatLightModule {
  constructor(params = {}) {
    this.params = Object.assign({
      name: 'Unknown object',
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

class DatCameraModule {
  constructor(params = {}) {
    this.params = Object.assign({
      name: 'Unknown object',
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

export default class DatGUIModule {
  constructor(params = {}) {
    this.gui = new dat.GUI();
  }

  Mesh(params = {}) {
    params.gui = this.gui;
    return new DatMeshModule(params);
  }

  Light(params = {}) {
    params.gui = this.gui;
    return new DatLightModule(params);
  }

  Camera(params = {}) {
    params.gui = this.gui;
    return new DatCameraModule(params);
  }
}
