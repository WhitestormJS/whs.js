import * as THREE from 'three';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {extend, loadMaterial} from '../../utils/index';

@MeshComponent
class Shape extends Component {
  constructor(params = {}) {
    super(params, Shape.defaults);

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
    const GConstruct = params.buffer && !params.softbody ? THREE.ComponentBufferGeometry : THREE.ComponentGeometry;

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
    return new Shape({build: false}).copy(this);
  }
}

export {
  Shape
};
