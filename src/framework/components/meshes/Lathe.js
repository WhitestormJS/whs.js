import * as THREE from 'three';
import {ConvexMesh, ConcaveMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {loadMaterial} from '../../utils/index';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Lathe extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      points: []
    }
  }

  constructor(params = {}) {
    super(params, Lathe.defaults, Lathe.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    let Mesh;

    if (this.physics && this.params.softbody) Mesh = SoftMesh;
    else if (this.physics && this.physics.type === 'concave') Mesh = ConcaveMesh;
    else if (this.physics) Mesh = ConvexMesh;
    else Mesh = THREE.Mesh;

    return new Promise((resolve) => {
      this.native = new Mesh(
        this.buildGeometry(params),
        material,
        this.params
      );

      resolve();
    });
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? THREE.LatheBufferGeometry : THREE.LatheGeometry;

    return new GConstruct(
      params.geometry.points
    );
  }

  set G_points(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {points: val}}));
  }

  get G_points() {
    return this._native.geometry.parameters.points;
  }

  clone() {
    return new Lathe({build: false}).copy(this);
  }
}

export {
  Lathe
};
