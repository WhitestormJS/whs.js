import {
  Mesh,
  ParametricBufferGeometry,
  ParametricGeometry,
  Vector3
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Parametric extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      func: (u, v) => new Vector3(u, v, 0),
      slices: 10,
      stacks: 10
    }
  }

  constructor(params = {}) {
    super(params, Parametric.defaults, Parametric.instructions);
  }

  build(params = this.params) {
    const {geometry, material} = this.applyBridge({
      geometry: this.buildGeometry(params),
      material: params.material
    });

    return this.applyBridge({mesh: new Mesh(geometry, material)}).mesh;
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? ParametricBufferGeometry : ParametricGeometry;

    return new GConstruct(
      params.geometry.func,
      params.geometry.slices,
      params.geometry.stacks
    );
  }
}

export {
  Parametric
};
