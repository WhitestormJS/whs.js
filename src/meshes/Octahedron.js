import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Octahedron extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'octahedron');

    WHS.API.extend(params.geometry, {

      radius: 1,
      detail: 0

    });

    this.build(params);
    super.wrap();
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        new THREE.OctahedronGeometry(
          params.geometry.radius,
          params.geometry.detail
        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new WHS.Octahedron(this.getParams(), this._type).copy(this);
  }
}

export {
  Octahedron as default
};
