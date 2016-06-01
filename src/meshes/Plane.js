import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Plane extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'plane');

    WHS.API.extend(params.geometry, {

      width: 10,
      height: 10,
      segments: 32

    });

    this.build(params);

    super.wrap();
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.PlaneMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        new THREE.PlaneGeometry(
          params.geometry.width,
          params.geometry.height,
          params.geometry.segments
        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  clone() {
    return new WHS.Plane(this.getParams(), this._type).copy(this);
  }
}

export {
  Plane as default
};
