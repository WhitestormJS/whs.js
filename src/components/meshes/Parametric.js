import {
  Mesh,
  ParametricBufferGeometry,
  ParametricGeometry
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Parametric extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      func: (u, v) => new THREE.Vector3(u, v, 0),
      slices: 10,
      stacks: 10
    }
  }

  constructor(params = {}) {
    super(params, Parametric.defaults, Parametric.instructions);

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
    const GConstruct = params.buffer && !params.softbody ? ParametricBufferGeometry : ParametricGeometry;

    return new GConstruct(
      params.geometry.func,
      params.geometry.slices,
      params.geometry.stacks
    );
  }

  set g_func(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {func: val}}));
  }

  get g_func() {
    return this._native.geometry.parameters.func;
  }

  set g_slices(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {slices: val}}));
  }

  get g_slices() {
    return this._native.geometry.parameters.slices;
  }

  set g_stacks(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {stacks: val}}));
  }

  get g_stacks() {
    return this._native.geometry.parameters.stacks;
  }

  clone() {
    return new Parametric({build: false}).copy(this);
  }
}

export {
  Parametric
};
