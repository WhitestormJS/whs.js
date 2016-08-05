import {Mesh} from '../core/mesh';

export class SphereMesh extends Mesh {
  constructor(geometry, material, params = {}) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;

    super(geometry, material, mass);

    if (!geometry.boundingSphere) geometry.computeBoundingSphere();
    this._physijs.type = 'sphere';
    this._physijs.radius = geometry.boundingSphere.radius;

    this._physijs.params = {
      friction: physParams.friction,
      restitution: physParams.restitution,
      damping: physParams.damping,
      margin: physParams.margin
    };

    this._physijs.mass = mass;
  }
}
