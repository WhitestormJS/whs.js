import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

import Shape from '../core/Shape';
import {extend} from '../extras/api';

class Box extends Shape {
  constructor(params = {}) {
    super(params, 'box');

    extend(params.geometry, {
      width: 1,
      height: 1,
      depth: 1
    });

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    const Mesh = this.physics ? Physijs.BoxMesh : THREE.Mesh;
    const material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      this.setNative(new Mesh(
        new THREE.BoxGeometry(
          params.geometry.width,
          params.geometry.height,
          params.geometry.depth
        ),
        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new Box(this.getParams(), this._type).copy(this);
  }
}

export {
  Box as default
};
