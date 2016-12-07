import {ConvexMesh, SoftMesh} from '../../index.js';

export function create(params, material) {
  return new (params.softbody ? SoftMesh : ConvexMesh)(
    this.buildGeometry(params),
    material,
    params
  );
}
