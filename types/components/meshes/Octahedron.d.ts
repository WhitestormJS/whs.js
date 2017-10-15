import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {PolyhedronBufferGeometry} from './Polyhedron';

import {
  Mesh,
  OctahedronGeometry,
} from 'three';

export class OctahedronBufferGeometry extends PolyhedronBufferGeometry {
    constructor(radius: number, detail: number);
}

export interface OctahedronParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

    /**
     * Radius of the octahedron. 
     * Default is 1.
     */
    radius?: number;

    /**
     * Setting this to a value greater than zero add vertices making it no longer an octahedron.
     * Default is 0.
     */
    detail?: number;
  }

  /** 
   * Sets whether to build a buffered geometry
   * Default is false.
   */
  buffer?: boolean;
}

 export class Octahedron extends MeshComponent {

   /**
    * @description Creates an Octahedron
    * @constructor
    * @param params parameters
    */
   constructor(params?: OctahedronParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: OctahedronParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: OctahedronParams): OctahedronGeometry | OctahedronBufferGeometry;
}
