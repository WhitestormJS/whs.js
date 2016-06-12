import * as THREE from 'three';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Shape2D extends Shape {
  constructor(params = {}) {
    super(params, 'shape2D');

    extend(params.geometry, {
      shapes: []
    });

    if (params.build) {
      this.build(params);
      super.wrap('onlyvis');
    }
  }

  build(params = {}) {
    const _scope = this,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new THREE.Mesh(
        this.buildGeometry(params),
        material
      ));

      resolve();
    });
  }

  buildGeometry(params = {}) {
    return new THREE.ShapeGeometry(
      params.geometry.shapes
    );
  }

  clone() {
    return new Shape2D({build: false}).copy(this);
  }
}

export {
  Shape2D
};
