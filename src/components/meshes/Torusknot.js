import {
  Mesh,
  TorusKnotBufferGeometry,
  TorusKnotGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Torusknot extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 100,
      tube: 40,
      radialSegments: 64,
      tubularSegments: 8,
      p: 2,
      q: 3
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: [
      'radius',
      'tube',
      'radialSegments',
      'tubularSegments',
      'p',
      'q'
    ]
  };

  constructor(params = {}) {
    super(params, Torusknot.defaults, Torusknot.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? TorusKnotBufferGeometry : TorusKnotGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.tube,
      params.geometry.radialSegments,
      params.geometry.tubularSegments,
      params.geometry.p,
      params.geometry.q
    );
  }
}

export {
  Torusknot
};
