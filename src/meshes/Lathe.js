WHS.Lathe = class Lathe extends WHS.Shape {

  /**
   * Create a lathe
   *
   * @param {Object} params - Lathe options
   * @param {Object} params.geometry - Lathe geometry options
   * @param {Array} params.geometry.points - Lathe points
   * @param {Material} params.material - Lathe material
   * @param {Number} params.mass - Lathe mass
   */
  constructor(params = {}) {

    super(params, 'lathe');

    WHS.API.extend(params.geometry, {

      points: []

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
        new THREE.LatheGeometry(

          params.geometry.points

        ),

        material,
        params.mass
      ));

      resolve();

    });

  }

  /**
   * Clone lathe.
   */
  clone() {

    return new WHS.Lathe(this.getParams(), this._type).copy(this);

  }

};
