import {CylinderMesh, SoftMesh} from '../../index.js';

export function create(params, material) {
  return new (params.softbody ? SoftMesh : CylinderMesh)(
    this.buildGeometry(params),
    material,
    params
  );
}
