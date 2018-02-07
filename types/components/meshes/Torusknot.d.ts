import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  Mesh
} from 'three';

export interface TorusknotParams extends MeshComponentParams {

  /** Geometry params */
  geometry?: {

      /** 
       * Radius. 
       * Default is 100. 
       */
      radius?: number;

      /** 
       * Diameter of the tube. 
       * Default is 40. 
       */
      tube?: number;

      /** 
       * The number of segments going along the tube. 
       * Default is 8. 
       */
      tubularSegments?: number;

      /** 
       * The number of segments going along the radius.
       * Default 64
       */
      radialSegments?: number;

      /** 
       * This value determines, how many times the geometry winds around its axis of rotational symmetry. 
       * Default is 2. 
       */
      p?: number;

      /** 
       * This value determines, how many times the geometry winds around a circle in the interior of the torus. 
       * Default is 3. 
       */
      q?: number;
      
  }
}

 export class Torusknot extends MeshComponent {
   /**
    * @description Creates a torus knot, the particular shape of which is defined by a pair of coprime integers, p and q. 
    * If p and q are not coprime, the result will be a torus link.
    * @constructor
    * @param params
    */
   constructor(params?: TorusknotParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: TorusknotParams): Mesh;
}
