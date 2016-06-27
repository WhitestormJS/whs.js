import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Lathe extends Shape {
  constructor(params = {}) {
    super(params, 'lathe');

    extend(params.geometry, {
      points: []
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
    return new THREE.LatheGeometry(
      params.geometry.points
    );
  }

  set G_points(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {points: val}}));
  }

  get G_points() {
    return this.native.geometry.parameters.points;
  }

  clone() {
    return new Lathe({build: false}).copy(this);
  }
}

export {
  Lathe
};
