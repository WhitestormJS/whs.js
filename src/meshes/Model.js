import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend, loadMaterial, JSONLoader} from '../extras/api';

class Model extends Shape {
  constructor(params = {}) {
    super(params, 'model');

    extend(params.geometry, {
      path: '',
      physics: '',
      loader: JSONLoader
    });

    if (params.build) {
      this.build(params);
      super.wrap('wait');
    }
  }

  build(params = {}) {
    let Mesh;

    if (this.physics && this.physics.type === 'concave') Mesh = Physijs.ConcaveMesh;
    else if (this.physics) Mesh = Physijs.ConvexMesh;
    else Mesh = THREE.Mesh

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
                  vertexColors: THREE.FaceColors
                })
              );
            } else if (!materials || params.material.useCustomMaterial) {
              material = loadMaterial(params.material);
            } else material = new THREE.MultiMaterial(materials);

            data.computeFaceNormals();
            data.computeVertexNormals();

            this.setNative(new Mesh(
              data,
              material,
              this.getParams(),
              data2
            ));

            resolve();
          });
        } else {
          let material;

          if (params.material.useVertexColors) {
            material = loadMaterial(
              extend(params.material, {
                morphTargets: true,
                vertexColors: THREE.FaceColors
              })
            );
          } else if (!materials || params.material.useCustomMaterial) {
            material = loadMaterial(params.material);
          } else material = new THREE.MultiMaterial(materials);

          data.computeFaceNormals();
          data.computeVertexNormals();

          console.log(this.getParams());

          this.setNative(new Mesh(
            data,
            material,
            this.getParams()
          ));

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
