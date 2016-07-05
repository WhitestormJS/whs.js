import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

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
    const material = super._initMaterial(params.material);

    let Mesh;

    if (this.physics && this.getParams().softbody) Mesh = Physijs.SoftMesh;
    else if (this.physics) Mesh = Physijs.BoxMesh;
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
    const GConstruct = params.buffer && !params.softbody ? THREE.BoxBufferGeometry : THREE.BoxGeometry;

    const geometry = new GConstruct(
      params.geometry.width,
      params.geometry.height,
      params.geometry.depth
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
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

  set G_depth(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {depth: val}}));
  }

  get G_depth() {
    return this.native.geometry.parameters.depth;
  }

  clone() {
    return this.getParams().softbody ? new Box(this.getParams()) : new Box({build: false}).copy(this);
  }
}

export {
  Box
};
