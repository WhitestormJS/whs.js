import * as THREE from 'three';
import Physijs from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend, loadMaterial} from '../extras/api';
import {JSONLoader} from '../utils/loaders';

class Morph extends Shape {
  constructor(params = {}) {
    super(params, 'morph');

    extend(params.geometry, {
      path: ''
    });

    if (params.build) {
      this.build(params);
      super.wrap('wait');
    }
  }

  build(params = {}) {
    const _scope = this;

    const promise = new Promise((resolve) => {
      JSONLoader.load(params.geometry.path, (data, materials) => {
        let material;
        if (params.material.useVertexColors) {
          material = loadMaterial(
            extend(params.material, {
              morphTargets: true,
              vertexColors: THREE.FaceColors
            })
          )._material;
        } else if (!materials || params.material.useCustomMaterial) {
          material = loadMaterial(
            params.material
          )._material;
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

        _scope.setNative(mesh);

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
