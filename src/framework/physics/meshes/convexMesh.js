import {Mesh} from '../core/mesh';

export class ConvexMesh extends Mesh {
  constructor(geom, material, params = {}, physicsReplacementGeometry) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    super(geom, material, mass, physParams);

    const geometry = physicsReplacementGeometry ? physicsReplacementGeometry : geom;

    const isBuffer = geometry.type === 'BufferGeometry';

    if (params.scale) geometry.scale(
      params.scale.x,
      params.scale.y,
      params.scale.z
    );

    const data = isBuffer ?
      geometry.attributes.position.array :
      new Float32Array(geometry.vertices.length * 3);

    if (!geometry.boundingBox) geom.computeBoundingBox();

    if(!isBuffer) {
      for (let i = 0; i < geometry.vertices.length; i++) {
        data[i * 3] = geometry.vertices[i].x;
        data[i * 3 + 1] = geometry.vertices[i].y;
        data[i * 3 + 2] = geometry.vertices[i].z;
      }
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
