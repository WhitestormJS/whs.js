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
      loader: new JSONLoader(),
      parser(geometry, materials) {
        return new Mesh(geometry, new MultiMaterial(materials));
      }
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
      params.geometry.loader.load(params.geometry.path, (...data) => { // geom, materials
        console.log(params.geometry.parser(...data));
        const mesh = this.applyBridge({mesh: params.geometry.parser(...data)}).mesh;

        const {geometry: geom, material: mat} = this.applyBridge({
          geometry: mesh.geometry,
          material: mesh.material
        });

        mesh.geometry = geom;
        mesh.material = params.useCustomMaterial ? params.material : mat;

        resolve(mesh);
      });
    });

    super.wait(promise);

    return promise;
  }
}

export {
  Model
};
