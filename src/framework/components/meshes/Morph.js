import {
  FaceColors,
  MultiMaterial,
  Mesh,
  AnimationMixer
} from 'three';

import * as Physijs from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {loadMaterial} from '../../utils/index';
import {JSONLoader} from '../../utils/loaders';

@MeshComponent
class Morph extends Component {
  static defaults = {
    ...Component.defaults,
    geometry: {
      path: '',
      loader: JSONLoader
    },

    morph: {
      duration: 1,
      speed: 100
    }
  };

  static instructions = {
    ...Component.instructions,
    geometry: ['path', 'loader'],
    morph: ['duration', 'speed']
  };

  constructor(params = {}) {
    super(params, Morph.defaults, Morph.instructions);

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const promise = new Promise((resolve) => {
      const Loader = params.geometry.loader;

      Loader.load(params.geometry.path, (data, materials) => {
        let material;
        if (params.material.useVertexColors) {
          material = loadMaterial(
            extend(params.material, {
              morphTargets: true,
              vertexColors: FaceColors
            })
          );
        } else if (!materials || params.material.useCustomMaterial) {
          material = loadMaterial(params.material);
        } else material = new MultiMaterial(materials);

        data.computeFaceNormals();
        data.computeVertexNormals();

        // Visualization.
        const mesh = new MeshNative(data, material);
        mesh.speed = params.morph.speed;
        mesh.mixer = new AnimationMixer(mesh);

        mesh.mixer
          .clipAction(data.animations[0])
          .setDuration(params.morph.duration)
          .play();

        this.native = mesh;

        resolve();
      });
    });

    super.wait(promise);
    return promise;
  }

  clone() {
    return new Morph({build: false}).copy(this);
  }
}

export {
  Morph
};
