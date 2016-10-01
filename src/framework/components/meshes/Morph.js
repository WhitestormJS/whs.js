import * as THREE from 'three';
import * as Physijs from '../../physics/index.js';

import {Component} from '../../core/Component';
import {MeshComponent} from '../../core/MeshComponent';
import {PhysicsComponent} from '../../core/PhysicsComponent';
import {SoftbodyComponent} from '../../core/SoftbodyComponent';
import {extend, loadMaterial} from '../../utils/index';
import {JSONLoader} from '../../utils/loaders';

@MeshComponent
class Morph extends Component {
  constructor(params = {}) {
    super(params, Morph.defaults);

    extend(params.geometry, {
      path: '',
      loader: JSONLoader
    });

    if (params.build) {
      this.build(params);
      super.wrap('wait');
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
              vertexColors: THREE.FaceColors
            })
          );
        } else if (!materials || params.material.useCustomMaterial) {
          material = loadMaterial(params.material);
        } else material = new THREE.MultiMaterial(materials);

        data.computeFaceNormals();
        data.computeVertexNormals();

        // Visualization.
        const mesh = new THREE.Mesh(data, material);
        mesh.speed = params.morph.speed;
        mesh.mixer = new THREE.AnimationMixer(mesh);

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
