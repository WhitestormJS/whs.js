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
    const material = super._initMaterial(params.material);

    let Mesh;

    if (this.physics && this.getParams().softbody) Mesh = Physijs.SoftMesh;
    else if (this.physics && this.physics.type === 'concave') Mesh = Physijs.ConcaveMesh;
    else if (this.physics) Mesh = Physijs.ConvexMesh;
    else Mesh = THREE.Mesh;

    return new Promise((resolve) => {
      this.setNative(new Mesh(
        this.buildGeometry(params),
        material,
        this.getParams()
      ));

      resolve();
    });
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? THREE.ParametricBufferGeometry : THREE.ParametricGeometry;

    return new GConstruct(
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
