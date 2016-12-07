import {ConvexMesh, ConcaveMesh, SoftMesh} from '../../index.js';

export function create(params, material) {
  return new (params.softbody ? SoftMesh :
      this.physics.type === 'concave' ? ConcaveMesh : ConvexMesh
    )(
    this.buildGeometry(params),
    material,
    params
  );
}
