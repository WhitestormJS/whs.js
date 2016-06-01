import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Morph extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'morph');

    WHS.API.extend(params.geometry, {

      path: ''

    });

    this.build(params);
    super.wrap('wait');
  }

  build(params = {}) {
    const _scope = this;

    const promise = new Promise((resolve, reject) => {
      WHS.API.loadJSON(params.geometry.path, (data, materials) => {
        if (params.material.useVertexColors) {
          material = WHS.API.loadMaterial(
            WHS.API.extend(params.material, {
              morphTargets: true,
              vertexColors: THREE.FaceColors
            })
          )._material;
        } else if (!materials || params.material.useCustomMaterial) {
          material = WHS.API.loadMaterial(
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
    return new WHS.Morph(this.getParams(), this._type).copy(this);
  }
}

export {
  Morph as default
};
