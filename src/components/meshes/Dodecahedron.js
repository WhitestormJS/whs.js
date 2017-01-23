import {
  Mesh,
  DodecahedronBufferGeometry,
  DodecahedronGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Dodecahedron extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      radius: 1,
      detail: 0
    }
  };

  static instructions = {
    ...MeshComponent.instructions,
    geometry: ['radius', 'detail']
  };

  constructor(params = {}) {
    super(params, Dodecahedron.defaults, Dodecahedron.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? DodecahedronBufferGeometry : DodecahedronGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.detail
    );
  }

  set g_radius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get g_radius() {
    return this._native.geometry.parameters.radius;
  }

  set g_detail(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {detail: val}}));
  }

  get g_detail() {
    return this._native.geometry.parameters.detail;
  }
}

export {
  Dodecahedron
};
