import {BoxMesh, SoftMesh} from '../../index.js';

export function create(params, material) {
  return new (params.softbody ? SoftMesh : BoxMesh)(
    this.buildGeometry(params),
    material,
    params
  );
}
