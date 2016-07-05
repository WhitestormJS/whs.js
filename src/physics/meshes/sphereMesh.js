import {Mesh} from '../core/mesh';

export class SphereMesh extends Mesh {
  constructor(geometry, material, params = {}) {
    super(geometry, material, params.mass);

    if (!geometry.boundingSphere) geometry.computeBoundingSphere();

    this._physijs.type = 'sphere';
    this._physijs.radius = geometry.boundingSphere.radius;
    this._physijs.mass = (typeof params.mass === 'undefined') ? (4 / 3) * Math.PI * Math.pow(this._physijs.radius, 3) : params.mass;
  }
}
