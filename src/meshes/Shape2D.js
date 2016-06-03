import * as THREE from 'three';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Shape2D extends Shape {
  constructor(params = {}) {
    super(params, 'shape2D');

    extend(params.geometry, {
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
    return new Shape2D(this.getParams(), this._type).copy(this);
  }
}

export {
  Shape2D
};
