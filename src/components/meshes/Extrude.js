import {
  Mesh,
  BufferGeometry,
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
    const extrudeGeometry = new ExtrudeGeometry(
      params.geometry.shapes,
      params.geometry.options
    );

    return params.buffer && !params.softbody ? new BufferGeometry().fromGeometry(extrudeGeometry) : extrudeGeometry;
  }
}

export {
  Extrude
};
