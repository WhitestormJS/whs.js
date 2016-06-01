import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

import Shape from '../core/Shape';
import {extend} from '../extras/api';

class Tetrahedron extends Shape {
  constructor(params = {}) {
    super(params, 'tetrahedron');

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
        new THREE.TetrahedronGeometry(
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
    return new Tetrahedron(this.getParams(), this._type).copy(this);
  }
}

export {
  Tetrahedron as default
};
