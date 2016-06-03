import * as THREE from 'three';
import Physijs  from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Sphere extends Shape {
  constructor(params = {}) {
    super(params, 'sphere');

    extend(params.geometry, {

      radius: 1,
      segmentA: 32,
      segmentB: 32

    });

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.SphereMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        new THREE.SphereGeometry(

          params.geometry.radius,
          params.geometry.segmentA,
          params.geometry.segmentB

        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new Sphere(this.getParams(), this._type).copy(this);
  }
}

export {
  Sphere
};
