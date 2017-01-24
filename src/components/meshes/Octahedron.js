import {
  Mesh,
  OctahedronBufferGeometry,
  OctahedronGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Octahedron extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 1,
      detail: 0
    }
  }

  constructor(params = {}) {
    super(params, Octahedron.defaults, Octahedron.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? OctahedronBufferGeometry : OctahedronGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.detail
    );
  }
}

export {
  Octahedron
};
