import * as THREE from 'three';
import Physijs  from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Extrude extends Shape {
  constructor(params = {}) {
    super(params, 'extrude');

    extend(params.geometry, {
      shapes: [],
      options: {}
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        this.buildGeometry(params),
        material,
        params.mass
      ));

      resolve();
    });
  }

  buildGeometry(params = {}) {
    return new THREE.ExtrudeGeometry(
      params.geometry.shapes,
      params.geometry.options
    );
  }

  clone() {
    return new Extrude({build: false}).copy(this);
  }
}

export {
  Extrude
};
