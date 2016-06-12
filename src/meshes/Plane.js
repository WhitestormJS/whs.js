import * as THREE from 'three';
import Physijs from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Plane extends Shape {
  constructor(params = {}) {
    super(params, 'plane');

    extend(params.geometry, {
      width: 10,
      height: 10,
      segments: 32
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.PlaneMesh : THREE.Mesh,
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
    return new THREE.PlaneGeometry(
      params.geometry.width,
      params.geometry.height,
      params.geometry.segments
    );
  }

  set G_width(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {width: val}}));
  }

  get G_width() {
    return this.native.geometry.parameters.width;
  }

  set G_height(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {height: val}}));
  }

  get G_height() {
    return this.native.geometry.parameters.height;
  }

  set G_segments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {segments: val}}));
  }

  get G_segments() {
    return this.native.geometry.parameters.segments;
  }

  clone() {
    return new Plane({build: false}).copy(this);
  }
}

export {
  Plane
};
