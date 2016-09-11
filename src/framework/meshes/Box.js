import * as THREE from 'three';
import {BoxMesh, SoftMesh} from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend, loadMaterial} from '../utils/index';

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
    const material = loadMaterial(params.material);

    let Mesh;

    if (this.physics && this.params.softbody) Mesh = SoftMesh;
    else if (this.physics) Mesh = BoxMesh;
    else Mesh = THREE.Mesh;

    return new Promise((resolve) => {
      this.native = new Mesh(
        this.buildGeometry(params),
        material,
        this.params
      );

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
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {width: val}}));
  }

  get G_width() {
    return this._native.geometry.parameters.width;
  }

  set G_height(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {height: val}}));
  }

  get G_height() {
    return this._native.geometry.parameters.height;
  }

  set G_depth(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {depth: val}}));
  }

  get G_depth() {
    return this._native.geometry.parameters.depth;
  }

  clone() {
    return this.params.softbody ? new Box(this.params) : new Box({build: false}).copy(this);
  }
}

export {
  Box
};
