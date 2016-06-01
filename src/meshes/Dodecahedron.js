import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Dodecahedron extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'dodecahedron');

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
        new THREE.DodecahedronGeometry(

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
    return new WHS.Dodecahedron(this.getParams(), this._type).copy(this);
  }
}

export {
  Dodecahedron as default
}
