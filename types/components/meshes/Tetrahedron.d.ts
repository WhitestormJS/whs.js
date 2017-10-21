import {
  MeshComponent, 
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  Mesh
} from 'three';

export interface TetrahedronParams extends MeshComponentParams {

  /** Geometry params */
  geometry?: {

      /** 
       * Radius of the tetrahedron. 
       * Default is 1. 
       */
      radius?: number;

      /** 
       * Setting this to a value greater than 0 adds vertices making it no longer a tetrahedron. 
       * Default is 0. 
       */
      detail?: number;
      
  }
}

 export class Tetrahedron extends MeshComponent {
   /**
    * @description Creates a Tetrahedron
    * @constructor
    * @param params
    */
   constructor(params?: TetrahedronParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: TetrahedronParams): Mesh;
}
