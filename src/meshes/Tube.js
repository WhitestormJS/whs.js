import * as THREE from 'three';
import Physijs  from '../physics/physi.js';

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
    const _scope = this,
      Mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        this.buildGeometry(params),
        material,
        params.mass
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
    return new THREE.TubeGeometry(
      params.geometry.path,
      params.geometry.segments,
      params.geometry.radius,
      params.geometry.radiusSegments,
      params.geometry.closed
    );
  }

  clone() {
    return new Tube({build: false}).copy(this);
  }
}

export {
  Tube
};
