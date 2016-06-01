import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

import Shape from '../core/Shape';
import {extend, loadJSON, loadMaterial} from '../extras/api';

class Morph extends Shape {
  constructor(params = {}) {
    super(params, 'morph');

    extend(params.geometry, {
      path: ''
    });

    this.build(params);
    super.wrap('wait');
  }

  build(params = {}) {
    const _scope = this;

    const promise = new Promise((resolve, reject) => {
      loadJSON(params.geometry.path, (data, materials) => {
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
    return new Morph(this.getParams(), this._type).copy(this);
  }
}

export {
  Morph as default
};
