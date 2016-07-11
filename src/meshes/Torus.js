import * as THREE from 'three';
import * as Physijs  from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Torus extends Shape {
  constructor(params = {}) {
    super(params, 'torus');

    extend(params.geometry, {
      radius: 100,
      tube: 40,
      radialSegments: 8,
      tubularSegments: 6,
      arc: Math.PI * 2
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
    const GConstruct = params.buffer && !params.softbody ? THREE.TorusBufferGeometry : THREE.TorusGeometry;

    return new THREE.TorusGeometry(
      params.geometry.radius,
      params.geometry.tube,
      params.geometry.radialSegments,
      params.geometry.tubularSegments,
      params.geometry.arc
    );
  }

  set G_radius(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get G_radius() {
    return this.native.geometry.parameters.radius;
  }

  set G_tube(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {tube: val}}));
  }

  get G_tube() {
    return this.native.geometry.parameters.tube;
  }

  set G_radialSegments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radialSegments: val}}));
  }

  get G_radialSegments() {
    return this.native.geometry.parameters.radialSegments;
  }

  set G_tubularSegments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {tubularSegments: val}}));
  }

  get G_tubularSegments() {
    return this.native.geometry.parameters.tubularSegments;
  }

  set G_arc(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {arc: val}}));
  }

  get G_arc() {
    return this.native.geometry.parameters.arc;
  }

  clone() {
    return new Torus({build: false}).copy(this);
  }
}

export {
  Torus
};
