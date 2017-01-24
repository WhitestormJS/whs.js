import {
  Mesh,
  ShapeBufferGeometry,
  ShapeGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Shape extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      shapes: []
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['shapes']
  };

  constructor(params = {}) {
    super(params, Shape.defaults, Shape.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? ShapeBufferGeometry : ShapeGeometry;

    return new GConstruct(
      params.geometry.shapes
    );
  }
}

export {
  Shape
};
