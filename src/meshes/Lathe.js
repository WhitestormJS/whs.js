import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Lathe extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'lathe');

    WHS.API.extend(params.geometry, {

      points: []

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
        new THREE.LatheGeometry(
          params.geometry.points
        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  /**
   * Clone lathe.
   */
  clone() {
    return new WHS.Lathe(this.getParams(), this._type).copy(this);
  }
}

export {
  Lathe as default
};
