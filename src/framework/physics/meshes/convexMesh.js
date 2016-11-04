import {Mesh} from '../core/mesh';

export class ConvexMesh extends Mesh {
  constructor(geom, material, params = {}, cGeometry) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    super(geom, material, mass, physParams);

    if (!geom.boundingBox) geom.computeBoundingBox();

    const geometry = cGeometry ? cGeometry : geom,
      data = new Float32Array(geometry.vertices.length * 3);

    const cScale = params.scale || {x: 1, y: 1, z: 1};
    cScale.x = cScale.x || 1;
    cScale.y = cScale.y || 1;
    cScale.z = cScale.z || 1;

    for (let i = 0; i < geometry.vertices.length; i++) {
      data[i * 3] = geometry.vertices[i].x * cScale.x;
      data[i * 3 + 1] = geometry.vertices[i].y * cScale.y;
      data[i * 3 + 2] = geometry.vertices[i].z * cScale.z;
    }

    const width = geom.boundingBox.max.x - geom.boundingBox.min.x;
    const height = geom.boundingBox.max.y - geom.boundingBox.min.y;
    const depth = geom.boundingBox.max.z - geom.boundingBox.min.z;

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
