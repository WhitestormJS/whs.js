import {PlaneMesh, ClothMesh} from '../../index.js';

export function create(params, material) {
  return new (params.softbody ? ClothMesh : PlaneMesh)(
    this.buildGeometry(params),
    material,
    params
  );
}
