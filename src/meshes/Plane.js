import * as THREE from 'three';
import Physijs  from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Plane extends Shape {
  constructor(params = {}) {
    super(params, 'plane');

    extend(params.geometry, {
      width: 10,
      height: 10,
      segments: 32
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.PlaneMesh : THREE.Mesh,
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
    return new THREE.PlaneGeometry(
      params.geometry.width,
      params.geometry.height,
      params.geometry.segments
    );
  }

  clone() {
    return new Plane({build: false}).copy(this);
  }
}

export {
  Plane
};
