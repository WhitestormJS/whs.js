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
    let {geometry, material} = this.applyBridge({
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

  set g_shapes(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {shapes: val}}));
  }

  get g_shapes() {
    return this._native.geometry.parameters.shapes;
  }

  clone() {
    return new Shape({build: false}).copy(this);
  }
}

export {
  Shape
};
