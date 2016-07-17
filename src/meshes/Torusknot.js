import * as THREE from 'three';
import * as Physijs from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Torusknot extends Shape {
  constructor(params = {}) {
    super(params, 'Torusknot');

    extend(params.geometry, {
      radius: 100,
      tube: 40,
      radialSegments: 64,
      tubularSegments: 8,
      p: 2,
      q: 3,
      heightScale: 1
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = super._initMaterial(params.material);

    let Mesh;

    if (this.physics && this.getParams().softbody) Mesh = Physijs.SoftMesh;
    else if (this.physics && this.physics.type === 'concave') Mesh = Physijs.ConcaveMesh;
    else if (this.physics) Mesh = Physijs.ConvexMesh;
    else Mesh = THREE.Mesh;

    return new Promise((resolve) => {
      this.setNative(new Mesh(
        this.buildGeometry(params),
        material,
        this.getParams()
      ));

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
      params.geometry.q,
      params.geometry.heightScale
    );
  }

  set G_radius(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get G_radius() {
    return this.native.geometry.parameters.radius;
  }

  set G_tube(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {tube: val}}));
  }

  get G_tube() {
    return this.native.geometry.parameters.tube;
  }

  set G_radialSegments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radialSegments: val}}));
  }

  get G_radialSegments() {
    return this.native.geometry.parameters.radialSegments;
  }

  set G_tubularSegments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {tubularSegments: val}}));
  }

  get G_tubularSegments() {
    return this.native.geometry.parameters.tubularSegments;
  }

  set G_p(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {p: val}}));
  }

  get G_p() {
    return this.native.geometry.parameters.p;
  }

  set G_q(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {q: val}}));
  }

  get G_q() {
    return this.native.geometry.parameters.q;
  }

  set G_heightScale(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {heightScale: val}}));
  }

  get G_heightScale() {
    return this.native.geometry.parameters.heightScale;
  }

  clone() {
    return new Torusknot(this.getParams(), this._type).copy(this);
  }
}

export {
  Torusknot
};
