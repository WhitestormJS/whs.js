import materials from './materials';
import {DatAPI} from './DatAPI';

export class DatMeshModule extends DatAPI {
  constructor(params = {}, gui) {
    super();

    this.params = Object.assign({
      name: 'Unknown mesh',
      geometry: true,
      material: true,
      transforms: true,
      gui: false
    }, params);

    this.gui = gui;
    this.fold = this.gui.addFolder(this.params.name);
    this.customMaterials = false;
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
        if (params[key] && material[key] !== undefined) {
          switch (params[key]) {
            case 'color':
              this.addColor(material, key, instance);
              break;
            case 'boolean':
              instance.add(material, key);
              break;
            case 'number':
              instance.add(material, key);
              break;
            case 'texture':
              // TODO
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
    if (!component.g_) throw new Error('DatGUIModule requires WHS.DynamicGeometryModule for geometry updates.');

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

  materials(materials = {}) {
    this.customMaterials = materials;

    return this;
  }

  integrate(self) {
    if (this.native) {
      self.bridge.material.bind(this)(this.native.material, self);
      self.bridge.geometry.bind(this)(this.native.geometry, self);
      self.bridge.onWrap.bind(this)(this.native, self);
    }
  }

  bridge = {
    material(material, self) {
      if (!self.params.material) return material;

      const folder = self.fold.addFolder('material');
      self.guiMaterial(this, material, folder);

      return material;
    },

    geometry(geometry, self) {
      if (!self.params.geometry) return geometry;
      if (!this.g_) throw new Error('WHS.DynamicGeometryModule should be used in a component (before gui)');

      const folder = self.fold.addFolder('geometry');
      self.guiGeometry(this, folder);

      return geometry;
    },

    mesh(mesh, self) {
      if (!self.customMaterials) return mesh;

      self.customMaterials.current = mesh.material;

      const matAlias = {material: 'current'}
      const keys = Object.keys(self.customMaterials);
      const folder = self.fold.addFolder('other materials');

      folder.add({material: 'current'}, 'material', keys).onChange(v => {
        mesh.material = self.customMaterials[v];
        folder.removeFolder('customize');
        self.guiMaterial(this, mesh.material, folder.addFolder('customize'));
      });

      return mesh;
    },

    onWrap(a, self) {
      self.guiTransforms(this.native, self.fold);
    }
  }
};
