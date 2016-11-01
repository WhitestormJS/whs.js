import {
  Mesh,
  MultiMaterial,
  FaceColors
} from 'three';

import {ConvexMesh, ConcaveMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial, JSONLoader} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Model extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      path: '',
      physics: '',
      loader: JSONLoader
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['path', 'physics', 'loader']
  };

  constructor(params = {}) {
    super(params, Model.defaults, Model.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    let MeshNative;

    if (this.physics && params.physics.type === 'concave') MeshNative = ConcaveMesh;
    else if (this.physics) MeshNative = ConvexMesh;
    else MeshNative = Mesh;

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

            this.native = new MeshNative(
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

          console.log(this.params);

          this.native = new MeshNative(
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
