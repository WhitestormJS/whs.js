import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Model extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'model');

    WHS.API.extend(params.geometry, {

      path: '',
      physics: ''

    });

    this.build(params);
    super.wrap('wait');
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh;

    const promise = new Promise((resolve) => {
      WHS.API.loadJSON(params.geometry.path, (data, materials) => {
        if (params.geometry.physics) {
          WHS.API.loadJSON(params.geometry.physics, data2 => {
            if (params.material.useVertexColors) {
              material = WHS.API.loadMaterial(
                WHS.API.extend(params.material, {
                  morphTargets: true,
                  vertexColors: THREE.FaceColors
                })
              )._material;
            } else if (!materials || params.material.useCustomMaterial) {
              material = WHS.API.loadMaterial(
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
            material = WHS.API.loadMaterial(
              WHS.API.extend(params.material, {
                morphTargets: true,
                vertexColors: THREE.FaceColors
              })
            )._material;
          } else if (!materials || params.material.useCustomMaterial) {
            material = WHS.API.loadMaterial(
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
    return new WHS.Model(this.getParams(), this._type).copy(this);
  }
}

export {
  Model as default
};
