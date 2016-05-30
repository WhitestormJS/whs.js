WHS.Parametric = class Parametric extends WHS.Shape {

  /**
   * Creates a parametric
   *
   * @param {Object} params - Parametric options
   * @param {Object} params.geometry - Parametric geometry options
   * @param {Function} params.func - Parametric function
   * @param {Number} params.slices - Parametric slices
   * @param {Number} params.stacks - Parametric stacks
   * @param {Material} params.material - Parametric material
   * @param {Number} params.mass - Parametric mass
   */
  constructor(params = {}) {

    super(params, 'parametric');

    WHS.API.extend(params.geometry, {

      func() {},
      slices: 10,
      stacks: 10

    });

    this.build(params);

    super.wrap();

  }

  build(params = {}) {

    const _scope = this,
      mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve, reject) => {

      _scope.setNative(new mesh(
        new THREE.ParametricGeometry(

          params.geometry.func,
          params.geometry.slices,
          params.geometry.stacks

        ),

        material,
        params.mass
      ));

      resolve();

    });

  }

  /**
   * Clone parametric.
   */
  clone() {

    return new WHS.Parametric(this.getParams(), this._type).copy(this);

  }

};
