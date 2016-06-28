import * as THREE from 'three';
import Physijs  from '../physics/index.js';

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

  set G_shapes(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {shapes: val}}));
  }

  get G_shapes() {
    return this.native.geometry.parameters.shapes;
  }

  set G_options(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {options: val}}));
  }

  get G_options() {
    return this.native.geometry.parameters.options;
  }

  clone() {
    return new Extrude({build: false}).copy(this);
  }
}

export {
  Extrude
};
