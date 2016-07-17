import {Mesh} from '../core/mesh';

export class ConvexMesh extends Mesh {
  constructor(geometry, material, params = {}) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    super(geometry, material, mass);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    const data = new Float32Array(geometry.vertices.length * 3);

    for (let i = 0; i < geometry.vertices.length; i++) {
      data[i * 3] = geometry.vertices[i].x;
      data[i * 3 + 1] = geometry.vertices[i].y;
      data[i * 3 + 2] = geometry.vertices[i].z;
    }

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'convex';
    this._physijs.data = data;
    this._physijs.mass = mass;

    this._physijs.params = {
      friction: physParams.friction,
      restitution: physParams.restitution,
      damping: physParams.damping,
      margin: physParams.margin
    };
  }
}
