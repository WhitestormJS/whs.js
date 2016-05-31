WHS.NormalLight = class NormalLight extends WHS.Light {

  /**
   * Normal light.
   *
   * @param {Object} params.light.color - Light color.
   */
  constructor(params = {}) {

    super(params, 'normallight');

    this.build(params);

    super.wrap();
    super.wrapShadow();

  }

  build(params = {}) {

    const _scope = this;

    return new Promise((resolve, reject) => {

      _scope.setNative(new THREE.Light(
        params.light.color
      ));

      resolve();

    });

  }

};
