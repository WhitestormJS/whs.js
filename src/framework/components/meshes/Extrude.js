import * as THREE from 'three';
import {ConvexMesh, ConcaveMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Extrude extends Component {
  static defautls = {
    ...Component.defaults,
    geometry: {
      shapes: [],
      options: {}
    }
  }

  constructor(params = {}) {
    super(params, Extrude.defaults);

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
    const GConstruct = params.buffer && !params.softbody ? THREE.ExtrudeBufferGeometry : THREE.ExtrudeGeometry;

    return new GConstruct(
      params.geometry.shapes,
      params.geometry.options
    );
  }

  set G_shapes(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {shapes: val}}));
  }

  get G_shapes() {
    return this._native.geometry.parameters.shapes;
  }

  set G_options(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {options: val}}));
  }

  get G_options() {
    return this._native.geometry.parameters.options;
  }

  clone() {
    return new Extrude({build: false}).copy(this);
  }
}

export {
  Extrude
};
