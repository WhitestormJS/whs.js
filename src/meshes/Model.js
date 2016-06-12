import * as THREE from 'three';
import Physijs  from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend, loadMaterial, JSONLoader} from '../extras/api';

class Model extends Shape {
  constructor(params = {}) {
    super(params, 'model');

    extend(params.geometry, {

      path: '',
      physics: ''

    });

    if (params.build) {
      this.build(params);
      super.wrap('wait');
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh;

    const promise = new Promise((resolve) => {
      JSONLoader.load(params.geometry.path, (data, materials) => {
        if (params.geometry.physics) {
          JSONLoader.load(params.geometry.physics, data2 => {
            let material;
            if (params.material.useVertexColors) {
              material = loadMaterial(
                extend(params.material, {
                  morphTargets: true,
                  vertexColors: THREE.FaceColors
                })
              )._material;
            } else if (!materials || params.material.useCustomMaterial) {
              material = loadMaterial(
                params.material
              )._material;
            } else material = new THREE.MultiMaterial(materials);

            data.computeFaceNormals();
            data.computeVertexNormals();

            _scope.setNative(new Mesh(
              data,
              material,
              params.mass,
              data2,
              params.scale
            ));

            resolve();
          });
        } else {
          if (params.material.useVertexColors) {
            let material;
            material = loadMaterial(
              extend(params.material, {
                morphTargets: true,
                vertexColors: THREE.FaceColors
              })
            )._material;
          } else if (!materials || params.material.useCustomMaterial) {
            material = loadMaterial(
              params.material
            )._material;
          } else material = new THREE.MultiMaterial(materials);

          data.computeFaceNormals();
          data.computeVertexNormals();

          _scope.setNative(new Mesh(
            data,
            material,
            params.mass
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
