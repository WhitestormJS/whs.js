import * as THREE from 'three';
import {ConvexMesh, ConcaveMesh, SoftMesh} from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial, FontLoader} from '../../utils/index';

@SoftbodyComponent
@PhysicsComponent
@MeshComponent
class Text extends Component {
  static defautls = {
    ...Component.defaults,
    geometry: {
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
    }
  }

  constructor(params = {}) {
    super(params, Text.defaults);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    let Mesh;

    if (this.physics && this.params.softbody) Mesh = SoftMesh;
    else if (this.physics && this.physics.type === 'concave') Mesh = ConcaveMesh;
    else if (this.physics) Mesh = ConvexMesh;
    else Mesh = THREE.Mesh;

    const promise = new Promise((resolve) => {
      FontLoader.load(params.geometry.parameters.font, font => {
        params.geometry.parameters.font = font;

        this.native = new Mesh(
          new THREE.TextGeometry(
            params.geometry.text,
            params.geometry.parameters
          ),

          material,
          this.params
        );

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
