import * as THREE from 'three';
import Physijs from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Torusknot extends Shape {
  constructor(params = {}) {
    super(params, 'Torusknot');

    extend(params.geometry, {
      radius: 100,
      tube: 40,
      radialSegments: 64,
      tubularSegments: 8,
      p: 2,
      q: 3,
      heightScale: 1
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

  buildGeometry(params = {}) {
    return new THREE.TorusKnotGeometry(
      params.geometry.radius,
      params.geometry.tube,
      params.geometry.radialSegments,
      params.geometry.tubularSegments,
      params.geometry.p,
      params.geometry.q,
      params.geometry.heightScale
    );
  }

  clone() {
    return new Torusknot(this.getParams(), this._type).copy(this);
  }
}

export {
  Torusknot
};
