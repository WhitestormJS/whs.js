import * as THREE from 'three';
import Physijs from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Box extends Shape {
  constructor(params = {}) {
    super(params, 'box');

    extend(params.geometry, {
      width: 1,
      height: 1,
      depth: 1
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const Mesh = this.physics ? Physijs.BoxMesh : THREE.Mesh;
    const material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      this.setNative(new Mesh(
        this.buildGeometry(params),
        material,
        params.mass
      ));

      resolve();
    });
  }

  buildGeometry(params = {}) {
    return new THREE.BoxGeometry(
      params.geometry.width,
      params.geometry.height,
      params.geometry.depth
    );
  }

  clone() {
    return new Box({build: false}).copy(this);
  }
}

export {
  Box
};
