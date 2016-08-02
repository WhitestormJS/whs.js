import {Mesh} from '../core/mesh';

export class ClothMesh extends Mesh {
  constructor(geometry, material, params = {}) {
    const physParams = params.physics,
      geomParams = geometry.parameters;

    const mass = physParams.mass || params.mass;
    super(geometry, material, mass);

    this._physijs.type = 'softClothMesh';

    const verts = geometry.attributes.position.array;

    if (!geomParams.widthSegments) geomParams.widthSegments = 1;
    if (!geomParams.heightSegments) geomParams.heightSegments = 1;

    const idx00 = 0;
    const idx01 = geomParams.widthSegments;
    const idx10 = (geomParams.heightSegments + 1) * (geomParams.widthSegments + 1) - (geomParams.widthSegments + 1);
    const idx11 = verts.length / 3 - 1;

    this._physijs.corners = [
      verts[idx01 * 3], verts[idx01 * 3 + 1], verts[idx01 * 3 + 2], //   ╗
      verts[idx00 * 3], verts[idx00 * 3 + 1], verts[idx00 * 3 + 2], // ╔
      verts[idx11 * 3], verts[idx11 * 3 + 1], verts[idx11 * 3 + 2], //       ╝ 
      verts[idx10 * 3], verts[idx10 * 3 + 1], verts[idx10 * 3 + 2], //     ╚
    ];

    this._physijs.segments = [geomParams.widthSegments + 1, geomParams.heightSegments + 1];

    this._physijs.params = {
      friction: physParams.friction,
      damping: physParams.damping,
      pressure: physParams.pressure,
      margin: physParams.margin,
      stiffness: physParams.stiffness
    };

    this._physijs.mass = mass;
  }

  appendAnchor(world, object, node, influence, collisionBetweenLinkedBodies = true) {
    const o1 = this._physijs.id;
    const o2 = object._physijs.id;

    world.execute('appendAnchor', {
      obj: o1,
      obj2: o2,
      node,
      influence,
      collisionBetweenLinkedBodies
    });
  }
}
