import * as THREE from 'three';
import Physijs from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Sphere extends Shape {
  constructor(params = {}) {
    super(params, 'sphere');

    extend(params.geometry, {
      radius: 1,
      widthSegments: 8,
      heightSegments: 6
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.SphereMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        _scope.buildGeometry(params),

        material,
        params.mass
      ));

      resolve();
    });
  }

  buildGeometry(params = {}) {
    return new THREE.SphereGeometry(
      params.geometry.radius,
      params.geometry.widthSegments,
      params.geometry.heightSegments
    );
  }

  set G_radius(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  clone() {
    return new Sphere({build: false}).copy(this);
  }
}

export {
  Sphere
};
