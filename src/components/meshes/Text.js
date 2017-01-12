import {
  Font,
  Mesh,
  TextGeometry
} from 'three';



import {MeshComponent} from '../../core/MeshComponent';
import {loadMaterial, FontLoader} from '../../utils/index';

class Text extends MeshComponent {
  static defaults = {
    ...MeshComponent.defaults,
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
    },

    physics: {
      create: false
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
    const material = loadMaterial(params.material);

    const promise = new Promise((resolve) => {
      FontLoader.load(params.geometry.parameters.font, font => {
        params.geometry.parameters.font = font;

        const geometry = new TextGeometry(
          params.geometry.text,
          params.geometry.parameters
        );

        this.native = this.isPhysics ? params.physics.create.bind(this)(this.params, material, geometry)
        : new Mesh(
          geometry,
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
