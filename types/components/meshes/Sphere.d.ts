import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  SphereGeometry,
  SphereBufferGeometry,
  Mesh
} from 'three';

export interface SphereParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

      /** 
       * Radius of the sphere. 
       * Default is 1. 
       */
      radius?: number;

      /** 
       * Number of horizontal segments. 
       * Minimum value is 3, and the default is 8. 
       */
      widthSegments?: number;

      /** 
       * Number of vertical segments. 
       * Minimum value is 2, and the default is 6. 
       */
      heightSegments?: number;


      phiStart?: number;
      phiLength?: number;
      thetaStart?: number;
      thetaLength?: number;
  };

  /**
   * Whether to create buffered geometry or not.
   * Default is false
   */
  buffer?: boolean;
}

 export class Sphere extends MeshComponent {

   /**
    * @description Creates a Sphere.
    * @constructor
    * @param params
    */
   constructor(params?: SphereParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: SphereParams): Mesh;

   /**
    * Build the geometry
    * @param params 
    */
   buildGeometry(params?: SphereParams): SphereGeometry | SphereBufferGeometry;
}
