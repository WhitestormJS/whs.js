import Mesh from '../core/mesh';

export default class ConcaveMesh extends Mesh {
  constructor(geom, material, mass, cGeometry, cScale) {
    const geometry = cGeometry ? cGeometry : geom,
      triangles = new Array(geometry.faces.length);

    super(this, geom, material, mass);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    cScale = cScale || {x: 1, y: 1, z: 1};
    cScale.x = cScale.x || 1;
    cScale.y = cScale.y || 1;
    cScale.z = cScale.z || 1;

    const vertices = geometry.vertices;

    for (let i = 0; i < geometry.faces.length; i++) {
      const face = geometry.faces[i];

      triangles[i] = [
        {x: vertices[face.a].x * cScale.x, y: vertices[face.a].y * cScale.y, z: vertices[face.a].z * cScale.z},
        {x: vertices[face.b].x * cScale.x, y: vertices[face.b].y * cScale.y, z: vertices[face.b].z * cScale.z},
        {x: vertices[face.c].x * cScale.x, y: vertices[face.c].y * cScale.y, z: vertices[face.c].z * cScale.z}
      ];
    }

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'concave';
    this._physijs.triangles = triangles;
    this._physijs.mass = (typeof mass === 'undefined') ? width * height * depth : mass;
  }
}
