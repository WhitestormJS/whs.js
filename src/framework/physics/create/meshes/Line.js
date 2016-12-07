import {RopeMesh} from '../../index.js';

export function create(params, material) {
  return new RopeMesh(
    this.buildGeometry(params),
    material,
    params
  );
}
