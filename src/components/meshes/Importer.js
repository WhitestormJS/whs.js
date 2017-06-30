import {
  Mesh,
  JSONLoader
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Importer extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,

    url: '',
    loader: new JSONLoader(),

    onLoad() {},
    onProgress() {},
    onError() {},

    texturePath: null,
    useCustomMaterial: false,

    parser(geometry, materials) {
      return new Mesh(geometry, materials);
    }
  };

  static instructions = {
    ...MeshComponent.instructions
  };

  static filter(object, filter) {
    const processFilter = object => {
      object.children.forEach((el, index) => {
        if (el.children) processFilter(el);
        if (!filter(el)) object.children.splice(index, 1);
      });

      return object;
    };

    return processFilter(object);
  }

  constructor(params = {}) {
    super(params, Importer.defaults, Importer.instructions, false);
  }

  build(params = {}) {
    const promise = new Promise(resolve => {
      if (params.texturePath) params.laoder.setTexturePath(params.texturePath);

      params.loader.load(params.url, (...data) => { // geometry, materials
        params.onLoad(...data);

        const object = this.applyBridge({mesh: params.parser(...data)}).mesh;

        const {geometry: geom, material: mat} = this.applyBridge({
          geometry: object.geometry,
          material: params.useCustomMaterial ? params.material : object.material
        });

        if (object.geometry) object.geometry = geom;
        if (object.material) object.material = mat;

        resolve(object);
      }, params.onProgress, params.onError);
    });

    super.wait(promise);

    return promise;
  }
}

export {
  Importer
};
