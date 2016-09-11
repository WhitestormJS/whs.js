import * as THREE from 'three';

import {Shape} from '../core/Shape';
import {extend, loadMaterial} from '../utils/index';

class Shape2D extends Shape {
  constructor(params = {}) {
    super(params, 'shape2D');

    extend(params.geometry, {
      shapes: []
    });

    if (params.build) {
      this.build(params);
      super.wrap('onlyvis');
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    return new Promise((resolve) => {
      this.native = new THREE.Mesh(
        this.buildGeometry(params),
        material
      );

      resolve();
    });
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? THREE.ShapeBufferGeometry : THREE.ShapeGeometry;

    return new GConstruct(
      params.geometry.shapes
    );
  }

  set G_shapes(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {shapes: val}}));
  }

  get G_shapes() {
    return this._native.geometry.parameters.shapes;
  }

  clone() {
    return new Shape2D({build: false}).copy(this);
  }
}

export {
  Shape2D
};
