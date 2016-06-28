import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Parametric extends Shape {
  constructor(params = {}) {
    super(params, 'parametric');

    extend(params.geometry, {
      func() {},
      slices: 10,
      stacks: 10
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh,
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
    return new THREE.ParametricGeometry(
      params.geometry.func,
      params.geometry.slices,
      params.geometry.stacks
    );
  }

  set G_func(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {func: val}}));
  }

  get G_func() {
    return this.native.geometry.parameters.func;
  }

  set G_slices(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {slices: val}}));
  }

  get G_slices() {
    return this.native.geometry.parameters.slices;
  }

  set G_stacks(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {stacks: val}}));
  }

  get G_stacks() {
    return this.native.geometry.parameters.stacks;
  }

  clone() {
    return new Parametric({build: false}).copy(this);
  }
}

export {
  Parametric
};
