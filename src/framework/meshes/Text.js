import * as THREE from 'three';
import {ConvexMesh, ConcaveMesh, SoftMesh} from '../physics/index.js';

import {Shape} from '../core/Shape';
import {extend, loadMaterial, FontLoader} from '../utils/index';

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
    const material = loadMaterial(params.material);

    let Mesh;

    if (this.physics && this.getParams().softbody) Mesh = SoftMesh;
    else if (this.physics && this.physics.type === 'concave') Mesh = ConcaveMesh;
    else if (this.physics) Mesh = ConvexMesh;
    else Mesh = THREE.Mesh;

    const promise = new Promise((resolve) => {
      FontLoader.load(params.geometry.parameters.font, font => {
        params.geometry.parameters.font = font;

        this.setNative(new Mesh(
          new THREE.TextGeometry(
            params.geometry.text,
            params.geometry.parameters
          ),

          material,
          this.getParams()
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
