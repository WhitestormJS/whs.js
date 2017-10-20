import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  BufferGeometry,
  Geometry,
  LineCurve3,
  Mesh
} from 'three';

export interface LineParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry: {

    /**
     * A LineCurve3 representing the curve to trace as a line 
     * @type {LineCurve3}
     */
    curve: LineCurve3;

    /**
     * Points is the number of pieces to divide the curve into. 
     * Default is 50.
     */
    points?: number;
  }

  /** Sets whether to build a buffered geometry */
  buffer?: boolean;
}

 export class Line extends MeshComponent {

   /**
    * @description Creates a Line
    * @constructor
    * @param params parameters
    */
   constructor(params?: LineParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: LineParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: LineParams): Geometry | BufferGeometry;
}
