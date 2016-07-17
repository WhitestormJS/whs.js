import * as THREE from 'three';
import Physijs  from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Extrude extends Shape {
  constructor(params = {}) {
    super(params, 'extrude');

    extend(params.geometry, {
      shapes: [],
      options: {}
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
    const GConstruct = params.buffer && !params.softbody ? THREE.ExtrudeBufferGeometry : THREE.ExtrudeGeometry;

    return new GConstruct(
      params.geometry.shapes,
      params.geometry.options
    );
  }

  set G_shapes(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {shapes: val}}));
  }

  get G_shapes() {
    return this.native.geometry.parameters.shapes;
  }

  set G_options(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {options: val}}));
  }

  get G_options() {
    return this.native.geometry.parameters.options;
  }

  clone() {
    return new Extrude({build: false}).copy(this);
  }
}

export {
  Extrude
};
