import * as THREE from 'three';
import Physijs  from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Tube extends Shape {
  constructor(params = {}) {
    super(params, 'tube');

    extend(params.geometry, {
      path: options.geometryOptions.path ? new this.CustomSinCurve(100) : false,
      segments: 20,
      radius: 2,
      radiusSegments: 8,
      closed: false
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

  get CustomSinCurve() {
    return THREE.Curve.create(

      (scale) => { // custom curve constructor
        this.scale = scale || 1;
      },

      (t) => { // getPoint: t is between 0-1
        const tx = t * 3 - 1.5,
          ty = Math.sin(2 * Math.PI * t),
          tz = 0;

        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }

    );
  }

  buildGeometry(params = {}) {
    const GConstruct = params.buffer && !params.softbody ? THREE.TubeBufferGeometry : THREE.TubeGeometry;

    return new GConstruct(
      params.geometry.path,
      params.geometry.segments,
      params.geometry.radius,
      params.geometry.radiusSegments,
      params.geometry.closed
    );
  }

  set G_path(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {path: val}}));
  }

  get G_path() {
    return this.native.geometry.parameters.path;
  }

  set G_segments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {segments: val}}));
  }

  get G_segments() {
    return this.native.geometry.parameters.segments;
  }

  set G_radius(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radius: val}}));
  }

  get G_radius() {
    return this.native.geometry.parameters.radius;
  }

  set G_radiusSegments(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {radiusSegments: val}}));
  }

  get G_radiusSegments() {
    return this.native.geometry.parameters.radiusSegments;
  }

  set G_closed(val) {
    this.native.geometry = this.buildGeometry(this.updateParams({geometry: {closed: val}}));
  }

  get G_closed() {
    return this.native.geometry.parameters.closed;
  }

  clone() {
    return new Tube({build: false}).copy(this);
  }
}

export {
  Tube
};
