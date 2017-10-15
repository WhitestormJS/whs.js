import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  BufferGeometry,
  Mesh,
  ParametricGeometry,
  Vector3
} from 'three';

export interface ParametricBufferGeometry extends BufferGeometry {
    constructor(func: (u: number, v: number) => Vector3, slices: number, stacks: number): ParametricBufferGeometry;

    parameters: {
        func: (u: number, v: number) => Vector3;
        slices: number;
        stacks: number;
    };
}

export interface ParametricParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

    /**
     * A function that takes in a u and v value each between 0 and 1 and returns a Vector3
     * Default is (u, v) => new Vector3(u, v, 0)
     */
    func?: Function;
    /**
     * 
     * Default is 10.
     */
    slices?: number;

    /**
     * 
     * Default is 10.
     */
    stacks?: number;
  };

  /** 
   * Sets whether to build a buffered geometry
   * Default is false.
   */
  buffer?: boolean;
}

 export class Parametric extends MeshComponent {

   /**
    * @description Creates a Parametric surface.
    * @constructor
    * @param params parameters
    */
   constructor(params?: ParametricParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: ParametricParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: ParametricParams): ParametricGeometry | ParametricBufferGeometry;
}
