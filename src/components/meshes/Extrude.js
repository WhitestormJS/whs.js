import {
  Mesh,
  ExtrudeBufferGeometry,
  ExtrudeGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Extrude extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      shapes: [],
      options: {}
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['shapes', 'options']
  };

  constructor(params = {}) {
    super(params, Extrude.defaults, Extrude.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? ExtrudeBufferGeometry : ExtrudeGeometry;

    return new GConstruct(
      params.geometry.shapes,
      params.geometry.options
    );
  }
}

export {
  Extrude
};
