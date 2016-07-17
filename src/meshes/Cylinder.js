import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Cylinder extends Shape {
  constructor(params = {}) {
    super(params, 'cylinder');

    extend(params.geometry, {
      radiusTop: 0,
      radiusBottom: 1,
      height: 1,
      radiusSegments: 32
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
    else if (this.physics) Mesh = Physijs.CylinderMesh;
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
    const GConstruct = params.buffer && !params.softbody ? THREE.CylinderBufferGeometry : THREE.CylinderGeometry;

    return new GConstruct(
      params.geometry.radiusTop,
      params.geometry.radiusBottom,
      params.geometry.height,
      params.geometry.radiusSegments
    );
  }

  set G_radiusTop(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusTop: val}}));
  }

  get G_radiusTop() {
    return this.native.geometry.parameters.radiusTop;
  }

  set G_radiusBottom(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusBottom: val}}));
  }

  get G_radiusBottom() {
    return this.native.geometry.parameters.radiusBottom;
  }

  set G_height(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {height: val}}));
  }

  get G_height() {
    return this.native.geometry.parameters.height;
  }

  set G_radiusSegments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusSegments: val}}));
  }

  get G_radiusSegments() {
    return this.native.geometry.parameters.radiusSegments;
  }

  clone() {
    return new Cylinder({build: false}).copy(this);
  }
}

export {
  Cylinder
};
