import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

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
      material = super._initMaterial(params.material);

    let Mesh;

    if (this.physics && this.getParams().softbody) Mesh = Physijs.SoftMesh;
    else if (this.physics) Mesh = Physijs.SphereMesh;
    else Mesh = THREE.Mesh;

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

  get G_radius() {
    return this.native.geometry.parameters.radius;
  }

  set G_widthSegments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {widthSegments: val}}));
  }

  get G_widthSegments() {
    return this.native.geometry.parameters.widthSegments;
  }

  set G_heightSegments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {widthSegments: val}}));
  }

  get G_heightSegments() {
    return this.native.geometry.parameters.widthSegments;
  }

  clone() {
    return new Sphere({build: false}).copy(this);
  }
}

export {
  Sphere
};
