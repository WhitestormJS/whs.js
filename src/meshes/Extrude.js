import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

import Shape from '../core/Shape';
import {extend} from '../extras/api';

class Extrude extends Shape {
  constructor(params = {}) {
    super(params, 'extrude');

    extend(params.geometry, {

      shapes: [],
      options: {}

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
        new THREE.ExtrudeGeometry(
          params.geometry.shapes,
          params.geometry.options
        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new Extrude(this.getParams(), this._type).copy(this);
  }
}

export {
  Extrude as default
};
