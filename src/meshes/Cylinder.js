import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

import Shape from '../core/Shape';
import {extend} from '../extras/api';

class Cylinder extends Shape {
  constructor(params = {}) {
    super(params, 'cylinder');

    extend(params.geometry, {

      radiusTop: 1,
      radiusBottom: 1,
      height: 1,
      radiusSegments: 32

    });

    this.build(params);

    super.wrap();
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.CylinderMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        new THREE.CylinderGeometry(

          params.geometry.radiusTop,
          params.geometry.radiusBottom,
          params.geometry.height,
          params.geometry.radiusSegments

        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new Cylinder(this.getParams(), this._type).copy(this);
  }
}

export {
  Cylinder as default
};
