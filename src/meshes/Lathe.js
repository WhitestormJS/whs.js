import * as THREE from 'three';
import Physijs  from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Lathe extends Shape {
  constructor(params = {}) {
    super(params, 'lathe');

    extend(params.geometry, {
      points: []
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
        new THREE.LatheGeometry(
          params.geometry.points
        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new Lathe(this.getParams(), this._type).copy(this);
  }
}

export {
  Lathe
};
