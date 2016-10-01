import * as THREE from 'three';
import {ConvexMesh, ConcaveMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import MeshComponent from '../../core/MeshComponent';
import PhysicsComponent from '../../core/PhysicsComponent';
import SoftbodyComponent from '../../core/SoftbodyComponent';
import {extend, loadMaterial} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Torusknot extends Component {
  constructor(params = {}) {
    super(params, Torusknot.defaults);

    extend(params.geometry, {
      radius: 100,
      tube: 40,
      radialSegments: 64,
      tubularSegments: 8,
      p: 2,
      q: 3
    });

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
    const GConstruct = params.buffer && !params.softbody ? THREE.TorusKnotBufferGeometry : THREE.TorusKnotGeometry;

    return new GConstruct(
      params.geometry.radius,
      params.geometry.tube,
      params.geometry.radialSegments,
      params.geometry.tubularSegments,
      params.geometry.p,
      params.geometry.q
    );
  }

  set G_radius(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get G_radius() {
    return this._native.geometry.parameters.radius;
  }

  set G_tube(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {tube: val}}));
  }

  get G_tube() {
    return this._native.geometry.parameters.tube;
  }

  set G_radialSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {radialSegments: val}}));
  }

  get G_radialSegments() {
    return this._native.geometry.parameters.radialSegments;
  }

  set G_tubularSegments(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {tubularSegments: val}}));
  }

  get G_tubularSegments() {
    return this._native.geometry.parameters.tubularSegments;
  }

  set G_p(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {p: val}}));
  }

  get G_p() {
    return this._native.geometry.parameters.p;
  }

  set G_q(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {q: val}}));
  }

  get G_q() {
    return this._native.geometry.parameters.q;
  }

  set G_heightScale(val) {
    this._native.geometry = this.buildGeometry(this.updateParams({geometry: {heightScale: val}}));
  }

  get G_heightScale() {
    return this._native.geometry.parameters.heightScale;
  }

  clone() {
    return new Torusknot(this.params, this._type).copy(this);
  }
}

export {
  Torusknot
};
