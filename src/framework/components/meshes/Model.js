import {
  Mesh,
  MultiMaterial,
  FaceColors
} from 'three';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {JSONLoader} from '../../utils/index';

@MeshComponent
class Model extends Component {
  static defaults = {
    ...Component.defaults,
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
    ...Component.instructions,
    geometry: ['path', 'physics', 'loader']
  };

  constructor(params = {}) {
    super(params, Model.defaults, Model.instructions, false);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
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

        this.native = this.applyBridge({mesh: new Mesh(
          geometry,
          material
        )}).mesh;

        resolve();
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
