import {
  Mesh,
  MultiMaterial,
  JSONLoader
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Model extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      path: '',
      loader: new JSONLoader()
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['path', 'loader']
  };

  constructor(params = {}) {
    super(params, Model.defaults, Model.instructions, false);
  }

  build(params = {}) {
    const promise = new Promise((resolve) => {
      params.geometry.loader.load(params.geometry.path, (geom, materials) => {
        const mat = params.useCustomMaterial
          ? params.material
          : new MultiMaterial(materials);

        const {geometry, material} = this.applyBridge({
          geometry: geom,
          material: mat
        });

        resolve(this.applyBridge({mesh: new Mesh(
          geometry,
          material
        )}).mesh);
      });
    });

    super.wait(promise);

    return promise;
  }
}

export {
  Model
};
