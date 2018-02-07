import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  Mesh,
  RingGeometry,
  RingBufferGeometry
} from 'three';

export interface RingParams extends MeshComponentParams {

  /** Geometry params */
  geometry?: {

    /**
     * Increase radius as it doesn't work right when innerRadius is set to 0.
     * Default is 0.
     */
    innerRadius?: number;

    /**
     * 
     * Default is 50.
     */
    outerRadius?: number;

    /**
     * Number of segments. 
     * A higher number means the ring will be more round. Minimum is 3.
     * Default is 8.
     */
    thetaSegments?: number;

    /**
     * Minimum is 1
     * Default is 8.
     */
    phiSegments?: number;

    /**
     * Starting angle
     * Default is 0.
     */
    thetaStart?: number;

    /**
     * Central angle
     * Default is Math.PI * 2.
     */
    thetaLength?: number;
  };

  /** 
   * Sets whether to build a buffered geometry
   * Default is false.
   */
  buffer?: boolean;
}

export class Ring extends MeshComponent {

  /**
   * @description Creates a two-dimensional ring geometry
   * @constructor
   * @param params parameters
   */
  constructor(params?: RingParams);

  /**
   * Build lifecycle creates a mesh using input params.
   * @param params 
   */
  build(params?: RingParams): Mesh;

  /**
   * Builds the geometry
   * @param params 
   */
  buildGeometry(params?: RingParams): RingGeometry | RingBufferGeometry;
}
