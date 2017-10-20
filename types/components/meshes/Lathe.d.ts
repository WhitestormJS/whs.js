import {
  MeshComponent,
   MeshComponentParams
} from '../../core/MeshComponent';

import {
  LatheBufferGeometry,
  LatheGeometry,
  Mesh,
  Vector2
} from 'three';

export interface LatheParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

    /**
     * Array of Vector2s. The x-coordinate of each point must be greater than zero.
     */
    points: Array<Vector2>;
  }

  /** Sets whether to build a buffered geometry */
  buffer?: boolean;
}

 export class Lathe extends MeshComponent {

   /**
    * @description Creates a Lath
    * @constructor
    * @param params parameters
    */
   constructor(params?: LatheParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: LatheParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: LatheParams): LatheGeometry | LatheBufferGeometry;
}
