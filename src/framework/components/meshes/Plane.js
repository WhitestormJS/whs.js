import * as THREE from 'three';
import {PlaneMesh, ClothMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Plane extends Component {
  static defautls = {
    ...Component.defaults,
    geometry: {
      width: 10,
      height: 10,
      wSegments: 32,
      hSegments: 32
    }
  }

  constructor(params = {}) {
    super(params, Plane.defaults);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    let Mesh;

    if (this.physics && this.params.softbody) Mesh = ClothMesh;
    else if (this.physics) Mesh = PlaneMesh;
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
    const GConstruct = params.buffer || params.softbody ? THREE.PlaneBufferGeometry : THREE.PlaneGeometry;

    const geometry = new GConstruct(
      params.geometry.width,
      params.geometry.height,
      params.geometry.wSegments,
      params.geometry.hSegments
    );

    if (params.softbody) this.proccessSoftbodyGeometry(geometry);

    return geometry;
  }

  set G_width(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {width: val}}));
  }

  get G_width() {
    return this._native.geometry.parameters.width;
  }

  set G_height(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {height: val}}));
  }

  get G_height() {
    return this._native.geometry.parameters.height;
  }

  set G_segments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {segments: val}}));
  }

  get G_segments() {
    return this._native.geometry.parameters.segments;
  }

  clone() {
    return new Plane({build: false}).copy(this);
  }
}

export {
  Plane
};
