import {
  Font,
  Mesh,
  TextGeometry,
  FontLoader
} from 'three';

import {MeshComponent} from '../../core/MeshComponent';

class Text extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
    geometry: {
      text: 'Hello World!',
      loader: new FontLoader(),

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
    ...MeshComponent.instructions,
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
    const promise = new Promise((resolve) => {
      FontLoader.load(params.geometry.parameters.font, font => {
        params.geometry.parameters.font = font;

        const {geometry, material} = this.applyBridge({
          geometry: new TextGeometry(
            params.geometry.text,
            params.geometry.parameters
          ),
          material: params.material
        });

        resolve(
          this.applyBridge({
            mesh: new Mesh(geometry, material)
          }).mesh
        );
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
