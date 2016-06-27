import Mesh from '../core/mesh';

export default class ConvexMesh extends Mesh {
  constructor(geometry, material, mass) {
    super(this, geometry, material, mass);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    const points = [];

    for (let i = 0; i < geometry.vertices.length; i++) {
      points.push({
        x: geometry.vertices[i].x,
        y: geometry.vertices[i].y,
        z: geometry.vertices[i].z
      });
    }

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'convex';
    this._physijs.points = points;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
  }
}
