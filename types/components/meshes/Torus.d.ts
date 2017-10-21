import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  Mesh
} from 'three';

export interface TorusParams extends MeshComponentParams {

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
       * Default is 6. 
       */
      tubularSegments?: number;

      /** 
       * The number of segments going along the radius.
       * Default 8
       */
      radialSegments?: number;

      /** 
       * Central angle..
       * Default is Math.PI * 2. 
       */
      arc?: number;
      
  }
}

 export class Torus extends MeshComponent {
   /**
    * @description Creates a Torus
    * @constructor
    * @param params
    */
   constructor(params?: TorusParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: TorusParams): Mesh;
}
