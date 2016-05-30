WHS.Model = class Model extends WHS.Shape {

  /**
   * Create a model
   *
   * @param {Object} params - Model options
   * @param {Object} params.geometry - Model geometry options
   * @param {String} params.geometry.path - Path to model JSON
   * @param {Material} params.material - Model material
   * @param {Number} params.mass - Model mass
   */
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
      mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh;

    const promise = new Promise((resolve, reject) => {

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

            _scope.setNative(new mesh(
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

          _scope.setNative(new mesh(
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

  /**
   * Clone model.
   */
  clone() {

    return new WHS.Model(this.getParams(), this._type).copy(this);

  }

};
