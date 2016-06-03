import * as THREE from 'three';
import Physijs  from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Torus extends Shape {
  constructor(params = {}) {
    super(params, 'torus');

    extend(params.geometry, {

      radius: 100,
      tube: 40,
      radialSegments: 8,
      tubularSegments: 6,
      arc: Math.PI * 2

    });

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        new THREE.TorusGeometry(
          params.geometry.radius,
          params.geometry.tube,
          params.geometry.radialSegments,
          params.geometry.tubularSegments,
          params.geometry.arc
        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new Torus(this.getParams(), this._type).copy(this);
  }
}

export {
  Torus
};
