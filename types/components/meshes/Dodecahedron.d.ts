import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  DodecahedronGeometry,
  DodecahedronBufferGeometry,
  Mesh
} from 'three';

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
   constructor(params?: SphereParams);

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
