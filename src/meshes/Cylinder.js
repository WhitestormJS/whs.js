import * as THREE from 'three';
import Physijs from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Cylinder extends Shape {
  constructor(params = {}) {
    super(params, 'cylinder');

    extend(params.geometry, {
      radiusTop: 0,
      radiusBottom: 1,
      height: 1,
      radiusSegments: 32
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.CylinderMesh : THREE.Mesh,
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
    return new THREE.CylinderGeometry(
      params.geometry.radiusTop,
      params.geometry.radiusBottom,
      params.geometry.height,
      params.geometry.radiusSegments
    );
  }

  clone() {
    return new Cylinder({build: false}).copy(this);
  }
}

export {
  Cylinder
};
