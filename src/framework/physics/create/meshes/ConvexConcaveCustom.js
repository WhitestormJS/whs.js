import {ConvexMesh, ConcaveMesh, SoftMesh} from '../../index.js';

export function create(params, material, geometry, geometry2 = false) {
  return geometry2 ? new (params.softbody ? SoftMesh :
      this.physics.type === 'concave' ? ConcaveMesh : ConvexMesh
    )(
    geometry,
    material,
    params,
    geometry2
  ) : new (params.softbody ? SoftMesh :
      this.physics.type === 'concave' ? ConcaveMesh : ConvexMesh
    )(
    geometry,
    material,
    params,
    geometry2
  );
}
