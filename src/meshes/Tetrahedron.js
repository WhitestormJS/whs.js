import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Tetrahedron extends Shape {
  constructor(params = {}) {
    super(params, 'tetrahedron');

    extend(params.geometry, {
      radius: 1,
      detail: 0
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
    const GConstruct = params.buffer && !params.softbody ? THREE.TetrahedronBufferGeometry : THREE.TetrahedronGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.detail
    );
  }

  set G_radius(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get G_radius() {
    return this.native.geometry.parameters.radius;
  }

  set G_detail(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {detail: val}}));
  }

  get G_detail() {
    return this.native.geometry.parameters.detail;
  }

  clone() {
    return new Tetrahedron({build: false}).copy(this);
  }
}

export {
  Tetrahedron
};
