import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  Mesh,
  PlaneBufferGeometry,
  PlaneGeometry
} from 'three';

export interface PlaneParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

    /**
     * Width along the X axis.
     * Default is 10.
     */
    width?: number;

    /**
     * Width along the Y axis.
     * Default is 10.
     */
    height?: number;

    /**
     * Number of width segments.
     * Default is 1.
     */
    wSegments?: number;

    /**
     * Number of height segments.
     * Default is 1.
     */
    hSegments?: number;
  };

  /** 
   * Sets whether to build a buffered geometry
   * Default is false.
   */
  buffer?: boolean;
}

 export class Plane extends MeshComponent {

   /**
    * @description Creates a Plane.
    * @constructor
    * @param params parameters
    */
   constructor(params?: PlaneParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: PlaneParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: PlaneParams): PlaneGeometry | PlaneBufferGeometry;
}
