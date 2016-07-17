import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Dodecahedron extends Shape {
  constructor(params = {}) {
    super(params, 'dodecahedron');

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
    const material = super._initMaterial(params.material);

    let Mesh;

    if (this.physics && this.getParams().softbody) Mesh = Physijs.SoftMesh;
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
    const GConstruct = params.buffer && !params.softbody ? THREE.DodecahedronBufferGeometry : THREE.DodecahedronGeometry;

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
    return new Dodecahedron({build: false}).copy(this);
  }
}

export {
  Dodecahedron
};
