import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  DodecahedronGeometry,
  Geometry,
  Mesh
} from 'three';

/**
 * this is missing in @types from three.js :(
 * 
 * @interface DodecahedronBufferGeometry
 * @extends {Geometry}
 */
interface DodecahedronBufferGeometry extends Geometry {
    constructor(radius: number, detail: number): DodecahedronBufferGeometry;

    parameters: {
        radius: number;
        detail: number;
    };
}

interface DodecahedronParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

    /**
     * Radius/
     */
    radius?: number;

    /**
     * Detail level.
     */
    detail?: number;
  };

  /**
   * Whether to create buffered geometry or not.
   * Default is false.
   */
  buffer?: boolean;
}

 export class Dodecahedron extends MeshComponent {

   /**
    * @constructor Creates a Dodecahedron
    * @param params
    */
   constructor(params?: DodecahedronParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: DodecahedronParams): Mesh;

   /**
    * Build the geometry
    * @param params 
    */
   buildGeometry(params?: DodecahedronParams): DodecahedronGeometry | DodecahedronBufferGeometry;
}
