import * as THREE from 'three';
import Physijs  from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend, loadMaterial, FontLoader} from '../extras/api';

class Text extends Shape {
  constructor(params = {}) {
    super(params, 'text');

    extend(params.geometry, {
      text: 'Hello World!',

      parameters: {
        size: 12,
        height: 50,
        curveSegments: 12,
        font: new THREE.Font(),
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8
      }
    });

    if (params.build) {
      this.build(params);
      super.wrap('wait');
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    const promise = new Promise((resolve) => {
      FontLoader.load(params.geometry.parameters.font, font => {
        params.geometry.parameters.font = font;

        _scope.setNative(new Mesh(
          new THREE.TextGeometry(
            params.geometry.text,
            params.geometry.parameters
          ),

          material,
          params.mass
        ));

        resolve();
      });
    });

    super.wait(promise);

    return promise;
  }

  clone() {
    return new Text({build: false}).copy(this);
  }
}

export {
  Text
};
