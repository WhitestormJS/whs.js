import {Mesh} from '../core/mesh';

export class PlaneMesh extends Mesh {
  constructor(geometry, material, params = {}) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    super(geometry, material, mass, physParams);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;

    this._physijs.type = 'plane';
    this._physijs.normal = geometry.faces[0].normal.clone();

    this._physijs.mass = mass;

    this._physijs.params = {
      friction: physParams.friction,
      restitution: physParams.restitution,
      damping: physParams.damping,
      margin: physParams.margin
    };
  }
}
