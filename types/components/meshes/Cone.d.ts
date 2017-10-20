import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  Mesh,
  ConeBufferGeometry,
  ConeGeometry
} from 'three';

export interface ConeParams extends MeshComponentParams {
  /** Geometry params */
  geometry?: {
    
    /** 
     * Radius of the cone at the base. 
     * Default is 20. 
     */
    radius?: number;

    /** 
     * Height of the cone. 
     * Default is 100.
     */
    height?: number;

    /**
     * Number of segmented faces around the circumference of the cone. 
     * Default is 8.
     */
    radiusSegments?: number;

    /**
     * Number of rows of faces along the height of the cone. 
     * Default is 1.
     */
    heightSegments?: number;

    /** 
     * Indicates whether the base of the cone is open or capped. 
     * Default is false, meaning capped.
     */
    openEnded?: boolean;

    /**
     * Start angle for first segment.
     * Default is 0 (three o'clock position).
     */
    thetaStart?: number;

    /**
     * The central angle, often called theta, of the circular sector. 
     * The default is Math.PI * 2, which makes for a complete cone.
     */
    thetaLength?: number;
  }
}

export interface BufferedConeParams extends ConeParams {

  /** Sets whether to build a buffered geometry */
  buffer?: boolean
} 

export class Cone extends MeshComponent {

   /**
    * @description Creates a Cone.
    * @param params
    */
   constructor(params?: ConeParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: ConeParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: BufferedConeParams): ConeGeometry | ConeBufferGeometry;
}
