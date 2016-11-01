import {
  Mesh,
  ParametricBufferGeometry,
  ParametricGeometry
} from 'three';

import {ConvexMesh, ConcaveMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Parametric extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      func() {},
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

  build(params = {}) {
    const material = loadMaterial(params.material);

    let MeshNative;

    if (this.physics && this.params.softbody) MeshNative = SoftMesh;
    else if (this.physics && this.physics.type === 'concave') MeshNative = ConcaveMesh;
    else if (this.physics) MeshNative = ConvexMesh;
    else MeshNative = Mesh;

    return new Promise((resolve) => {
      this.native = new MeshNative(
        this.buildGeometry(params),
        material,
        this.params
      );

      resolve();
    });
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? ParametricBufferGeometry : ParametricGeometry;

    return new GConstruct(
      params.geometry.func,
      params.geometry.slices,
      params.geometry.stacks
    );
  }

  set G_func(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {func: val}}));
  }

  get G_func() {
    return this._native.geometry.parameters.func;
  }

  set G_slices(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {slices: val}}));
  }

  get G_slices() {
    return this._native.geometry.parameters.slices;
  }

  set G_stacks(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {stacks: val}}));
  }

  get G_stacks() {
    return this._native.geometry.parameters.stacks;
  }

  clone() {
    return new Parametric({build: false}).copy(this);
  }
}

export {
  Parametric
};
