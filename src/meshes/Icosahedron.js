import * as THREE from 'three';
import Physijs  from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Icosahedron extends Shape {
  constructor(params = {}) {
    super(params, 'icosahedron');

    extend(params.geometry, {

      radius: 1,
      detail: 0

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
        new THREE.IcosahedronGeometry(
          params.geometry.radius,
          params.geometry.detail
        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new Icosahderon(this.getParams(), this._type).copy(this);
  }
}

export {
  Icosahedron
};
