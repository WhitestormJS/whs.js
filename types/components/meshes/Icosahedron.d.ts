import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  IcosahedronGeometry,
  Mesh,
  PolyhedronGeometry
} from 'three';

export interface IcosahedronBufferGeometry extends PolyhedronGeometry {
    constructor(radius: number, detail: number): IcosahedronBufferGeometry;
}

export interface IcosahedronParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {
    
    /**
     * Radius
     * Default is 1.
     */
    radius?: number;

    /**
     * Detail level.
     * Setting this to a value greater than 0 adds more vertices making it no longer an icosahedron. 
     * When detail is greater than 1, it's effectively a sphere.
     * Default is 0.
     */
    detail?: number;
  };

  /**
   * Whether to create buffered geometry or not.
   * Default is false.
   */
  buffer?: boolean;
}

 export class Icosahedron extends MeshComponent {

   /**
    * @description Creates an Icosahedron.
    * @constructor
    * @param params
    */
   constructor(params?: IcosahedronParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: IcosahedronParams): Mesh;

   /**
    * Build the geometry
    * @param params 
    */
   buildGeometry(params?: IcosahedronParams): IcosahedronGeometry | IcosahedronBufferGeometry;
}
