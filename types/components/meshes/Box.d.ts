import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  BoxGeometry,
  BoxBufferGeometry,
  Mesh
} from 'three';

export interface BoxParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {
    /** 
     * Width of the sides on the X axis. 
     * Default is 1.
     */
    width?: number;

    /** 
     * Height of the sides on the Y axis. 
     * Default is 1.
     */
    height?: number;

    /** 
     * Depth of the sides on the Z axis. 
     * Default is 1. 
     */
    depth?: number;

    /** 
     * Number of segmented faces along the width of the sides. 
     * Default is 1. 
     */
    widthSegments?: number;

    /**
     *  Number of segmented faces along the height of the sides. 
     * Default is 1. 
     */
    heightSegments?: number;

    /** 
     * Number of segmented faces along the depth of the sides. 
     * Default is 1.
     */
    depthSegments?: number;
  };

  /** Sets whether to build a buffered geometry */
  buffer?: boolean;
}

 export class Box extends MeshComponent {

   /**
    * @description Creates a Box
    * @constructor
    * @param params parameters
    */
   constructor(params?: BoxParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: BoxParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: BoxParams): BoxGeometry | BoxBufferGeometry;
}
