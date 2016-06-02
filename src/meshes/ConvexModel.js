import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

import Shape from '../core/Shape';
import {extend, loadMaterial} from '../extras/api';
import {loadJson} from '../utils/loader';

class ConvexModel extends Shape {
  constructor(params = {}) {
    super(params, 'model');

    extend(params.geometry, {
      path: '',
      physics: ''
    });

    this.build(params);
    super.wrap('wait');
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh;

    const promise = new Promise((resolve) => {
      loadJson(params.geometry.path, (data, materials) => {
        if (params.geometry.physics) {
          loadJson(params.geometry.physics, data2 => {
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
    return new ConvexModel(this.getParams()).copy(this);
  }
}

export {
  ConvexModel as default
};
