import THREE from 'three';

class Shape2D extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'shape2D');

    WHS.API.extend(params.geometry, {

      shapes: []

    });

    super.build(params);
    super.wrap('onlyvis');
  }

  build(params = {}) {
    const _scope = this,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new THREE.Mesh(
        new THREE.ShapeGeometry(
          params.geometry.shapes
        ),

        material
      ));

      resolve();
    });
  }

  clone() {
    return new WHS.Shape2D(this.getParams(), this._type).copy(this);
  }
}

export {
  Shape2D as default
};
