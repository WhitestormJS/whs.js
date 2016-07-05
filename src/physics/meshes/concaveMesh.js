import {Mesh} from '../core/mesh';

export class ConcaveMesh extends Mesh {
  constructor(geom, material, mass, cGeometry, cScale) {
    const geometry = cGeometry ? cGeometry : geom,
      data = new Float32Array(geometry.faces.length * 9);

    super(geom, material, mass);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    cScale = cScale || {x: 1, y: 1, z: 1};
    cScale.x = cScale.x || 1;
    cScale.y = cScale.y || 1;
    cScale.z = cScale.z || 1;

    const vertices = geometry.vertices;

    for (let i = 0; i < geometry.faces.length; i++) {
      const face = geometry.faces[i];

      data[i * 9] = vertices[face.a].x * cScale.x;
      data[i * 9 + 1] = vertices[face.a].y * cScale.y;
      data[i * 9 + 2] = vertices[face.a].z * cScale.z;

      data[i * 9 + 3] = vertices[face.b].x * cScale.x;
      data[i * 9 + 4] = vertices[face.b].y * cScale.y;
      data[i * 9 + 5] = vertices[face.b].z * cScale.z;

      data[i * 9 + 6] = vertices[face.c].x * cScale.x;
      data[i * 9 + 7] = vertices[face.c].y * cScale.y;
      data[i * 9 + 8] = vertices[face.c].z * cScale.z;
    }

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'concave';
    this._physijs.data = data;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
  }
}
