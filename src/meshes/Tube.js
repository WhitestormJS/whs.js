import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Tube extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'tube');

    WHS.API.extend(params.geometry, {

      path: options.geometryOptions.path ? new this.CustomSinCurve(100) : false,
      segments: 20,
      radius: 2,
      radiusSegments: 8,
      closed: false

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
        new THREE.TubeGeometry(

          params.geometry.path,
          params.geometry.segments,
          params.geometry.radius,
          params.geometry.radiusSegments,
          params.geometry.closed

        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  get CustomSinCurve() {
    return THREE.Curve.create(

      (scale) => { // custom curve constructor
        this.scale = scale || 1;
      },

      (t) => { // getPoint: t is between 0-1
        const tx = t * 3 - 1.5,
          ty = Math.sin(2 * Math.PI * t),
          tz = 0;

        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
      }

    );
  }

  /**
   * Clone tube.
   */
  clone() {
    return new WHS.Tube(this.getParams(), this._type).copy(this);
  }
}

export {
  Tube as default
};
