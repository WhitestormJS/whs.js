import Mesh from '../core/mesh';

export default class SphereMesh extends Mesh {
  constructor(geometry, material, mass) {
    super(this, geometry, material, mass);

    if (!geometry.boundingSphere) geometry.computeBoundingSphere();

    this._physijs.type = 'sphere';
    this._physijs.radius = geometry.boundingSphere.radius;
    this._physijs.mass = (typeof mass === 'undefined') ? (4 / 3) * Math.PI * Math.pow(this._physijs.radius, 3) : mass;
  }
}
