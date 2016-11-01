import {
  Font,
  Mesh,
  TextGeometry
} from 'three';

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
  static defaults = {
    ...Component.defaults,
    geometry: {
      text: 'Hello World!',

      parameters: {
        size: 12,
        height: 50,
        curveSegments: 12,
        font: new Font(),
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 8
      }
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['text', 'parameters']
  }

  constructor(params = {}) {
    super(params, Text.defaults, Text.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const material = loadMaterial(params.material);

    let MeshNative;

    if (this.physics && this.params.softbody) MeshNative = SoftMesh;
    else if (this.physics && this.physics.type === 'concave') MeshNative = ConcaveMesh;
    else if (this.physics) MeshNative = ConvexMesh;
    else MeshNative = Mesh;

    const promise = new Promise((resolve) => {
      FontLoader.load(params.geometry.parameters.font, font => {
        params.geometry.parameters.font = font;

        this.native = new MeshNative(
          new TextGeometry(
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
