import {Mesh} from '../core/mesh';

export class ConcaveMesh extends Mesh {
  constructor(geom, material, params = {}, physicsReplacementGeometry) {
    const physParams = params.physics;
    const mass = physParams.mass || params.mass;
    super(geom, material, mass, physParams);

    const geometry = physicsReplacementGeometry ? physicsReplacementGeometry : geom;

    const isBuffer = geometry.type === 'BufferGeometry';

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    const data = isBuffer ?
      geometry.attributes.position.array :
      new Float32Array(geometry.faces.length * 9);

    if (params.scale) geometry.scale(
      params.scale.x,
      params.scale.y,
      params.scale.z
    );

    const vertices = geometry.vertices;

    if (!isBuffer) {
      for (let i = 0; i < geometry.faces.length; i++) {
        const face = geometry.faces[i];

        data[i * 9] = vertices[face.a].x;
        data[i * 9 + 1] = vertices[face.a].y;
        data[i * 9 + 2] = vertices[face.a].z;

        data[i * 9 + 3] = vertices[face.b].x;
        data[i * 9 + 4] = vertices[face.b].y;
        data[i * 9 + 5] = vertices[face.b].z;

        data[i * 9 + 6] = vertices[face.c].x;
        data[i * 9 + 7] = vertices[face.c].y;
        data[i * 9 + 8] = vertices[face.c].z;
      }
    }

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'concave';
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
