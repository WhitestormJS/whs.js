import {
  Mesh,
  OctahedronBufferGeometry,
  OctahedronGeometry
} from 'three';

import {ConvexMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Octahedron extends Component {
  static defaults = {
    ...Component.defaults,
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

  build(params = {}) {
    const material = loadMaterial(params.material);

    let MeshNative;

    if (this.physics && this.params.softbody) MeshNative = SoftMesh;
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
    const GConstruct = params.buffer && !params.softbody ? OctahedronBufferGeometry : OctahedronGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.detail
    );
  }

  set G_radius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get G_radius() {
    return this._native.geometry.parameters.radius;
  }

  set G_detail(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {detail: val}}));
  }

  get G_detail() {
    return this._native.geometry.parameters.detail;
  }

  clone() {
    return new Octahedron({build: false}).copy(this);
  }
}

export {
  Octahedron
};
