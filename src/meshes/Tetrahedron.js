WHS.Tetrahedron = class Tetrahedron extends WHS.Shape {

  /**
   * Creates a tetrahedron
   *
   * @param {Object} params - Tetrahedron options
   * @param {Object} params.geometry - Tetrahedron geometry options
   * @param {Number} params.geometry.radius - Tetrahedron radius
   * @param {Number} params.geometry.detail - Tetrahedron detail
   * @param {Material} params.material - Tetrahedron material
   * @param {Number} params.mass - Tetrahedron mass
   */
  constructor(params = {}) {

    super(params, 'tetrahedron');

    WHS.API.extend(params.geometry, {

      radius: 1,
      detail: 0

    });

    this.build(params);

    super.wrap();

  }

  build(params = {}) {

    const _scope = this,
      mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve, reject) => {

      _scope.setNative(new mesh(
        new THREE.TetrahedronGeometry(

          params.geometry.radius,
          params.geometry.detail

        ),

        material,
        params.mass
      ));

      resolve();

    });

  }

  /**
   * Clone tetrahedron.
   */
  clone() {

    return new WHS.Tetrahedron(this.getParams(), this._type).copy(this);

  }

};
