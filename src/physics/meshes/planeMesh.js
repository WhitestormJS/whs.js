import Mesh from '../core/mesh';

export default class PlaneMesh extends Mesh {
  constructor(geometry, material, mass) {
    super(this, geometry, material, mass);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

    this._physijs.type = 'plane';
    this._physijs.normal = geometry.faces[0].normal.clone();
    this._physijs.mass = (typeof mass === 'undefined') ? width * height : mass;
  }
}
