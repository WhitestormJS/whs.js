import {SphereMesh, SoftMesh} from '../../index.js';

export function create(params, material) {
  return new (params.softbody ? SoftMesh : SphereMesh)(
    this.buildGeometry(params),
    material,
    params
  );
}
