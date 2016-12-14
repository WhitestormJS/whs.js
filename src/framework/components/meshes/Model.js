import {
  Mesh,
  MultiMaterial,
  FaceColors
} from 'three';



import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial, JSONLoader} from '../../utils/index';

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
      const pGeometry = params.geometry;
      const Loader = pGeometry.loader

      Loader.load(pGeometry.path, (data, materials) => {
        if (pGeometry.physics) {
          Loader.load(pGeometry.physics, data2 => {
            let material;

            if (params.material.useVertexColors) {
              material = loadMaterial(
                extend(params.material, {
                  morphTargets: true,
                  vertexColors: FaceColors
                })
              );
            } else if (!materials || params.material.useCustomMaterial) {
              material = loadMaterial(params.material);
            } else material = new MultiMaterial(materials);

            data.computeFaceNormals();
            data.computeVertexNormals();

            this.native = this.isPhysics ? params.physics.create.bind(this)(this.params, material, data, data2)
            : new Mesh(
              data,
              material,
              this.params,
              data2
            );

            resolve();
          });
        } else {
          let material;

          if (params.material.useVertexColors) {
            material = loadMaterial(
              extend(params.material, {
                morphTargets: true,
                vertexColors: FaceColors
              })
            );
          } else if (!materials || params.material.useCustomMaterial) {
            material = loadMaterial(params.material);
          } else material = new MultiMaterial(materials);

          data.computeFaceNormals();
          data.computeVertexNormals();

          this.native = this.isPhysics ? params.physics.create.bind(this)(this.params, material, data)
          : new Mesh(
            data,
            material,
            this.params
          );

          resolve();
        }
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
