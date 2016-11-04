import {Mesh} from '../core/mesh';

export class CylinderMesh extends Mesh {
  constructor(geometry, material, params = {}) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    super(geometry, material, mass, physParams);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'cylinder';
    this._physijs.width = width;
    this._physijs.height = height;
    this._physijs.depth = depth;
    this._physijs.mass = mass;

    this._physijs.params = {
      friction: physParams.friction,
      restitution: physParams.restitution,
      damping: physParams.damping,
      margin: physParams.margin
    };
  }
}
