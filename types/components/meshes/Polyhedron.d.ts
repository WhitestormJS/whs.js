import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  BufferGeometry,
  Mesh,
  PolyhedronGeometry,
} from 'three';

export class PolyhedronBufferGeometry extends BufferGeometry {
  constructor(vertices: number[], indices: number[], radius?: number, detail?: number);

  parameters: {
      vertices: number[];
      indices: number[];
      radius: number;
      detail: number;
  };
}

export interface PolyhedronParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

    /**
     * Array of points of the form [1,1,1, -1,-1,-1, ... ] 
     */
    verticesOfCube?: Array<number>;

    /**
     * Array of indices that make up the faces of the form [0,1,2, 2,3,0, ... ] 
     */
    indicesOfFaces?: Array<number>;

    /**
     * The radius of the final shape 
     * Default is 6.
     */
    radius?: number;

    /**
     * How many levels to subdivide the geometry. 
     * The more detail, the smoother the shape.
     * Default is 2.
     */
    detail?: number;
  };

  /** 
   * Sets whether to build a buffered geometry
   * Default is false.
   */
  buffer?: boolean;
}

 export class Polyhedron extends MeshComponent {

   /**
    * @description A polyhedron is a solid in three dimensions with flat faces. 
    * This component will take an array of vertices, project them onto a sphere, and then divide them up to the desired level of detail.
    * @constructor
    * @param params parameters
    */
   constructor(params?: PolyhedronParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: PolyhedronParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: PolyhedronParams): PolyhedronGeometry | PolyhedronBufferGeometry;
}
