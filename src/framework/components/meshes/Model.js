import {
  Mesh,
  MultiMaterial,
  FaceColors
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';
import {JSONLoader} from '../../utils/index';

class Model extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      path: '',
      physics: '',
      loader: JSONLoader
    },

    physics: {
      create: false
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['path', 'physics', 'loader']
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

        let {geometry, material} = this.applyBridge({
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

  clone() {
    return new Model({build: false}).copy(this);
  }
}

export {
  Model
};
