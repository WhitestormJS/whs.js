import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  CylinderGeometry,
  CylinderBufferGeometry,
  Mesh
} from 'three';

export interface CylinderParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

      /** 
       * Radius of the top of the cylinder. 
       * Default is 0. 
       */
      radiusTop?: number;

      /** 
       * Radius of the bottom of the cylinder. 
       * Default is 1. 
       */
      radiusBottom?: number;

      /**
       * Height of cylinder.
       * Default is 1.
       */
      height?: number;

      /** 
       * Number of radius segments. 
       * Default is 32.
       */
      radiusSegments?: number;

      /**
       * Whether the cylinder is open ended.
       * Default is false.
       */
      openEnded?: boolean;

      /**
       * Thetha start.
       * Default is 0.
       */
      thetaStart?: number;

      /**
       * The thetha length
       * Default is Math.PI * 2.
       */
      thetaLength?: number;
  };

  /**
   * Whether to create buffered geometry or not.
   * Default is false.
   */
  buffer?: boolean;
}

 export class Cylinder extends MeshComponent {

   /**
    * @description Creates a Cylinder. 
    * @constructor
    * @param params
    */
   constructor(params?: CylinderParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: CylinderParams): Mesh;

   /**
    * Build the geometry
    * @param params 
    */
   buildGeometry(params?: CylinderParams): CylinderGeometry | CylinderBufferGeometry;
}
