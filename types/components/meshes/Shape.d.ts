import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  BufferGeometry,
  Mesh,
  Shape as ShapeNative,
  ShapeGeometry
} from 'three';

export interface ShapeBufferGeometry extends BufferGeometry {
    constructor(shape: ShapeNative, options?: any): ShapeBufferGeometry;
    constructor(shapes: ShapeNative[], options?: any): ShapeBufferGeometry;
}

export interface ShapeParams extends MeshComponentParams {

  /** Geometry params */
  geometry: {

    /**
     * Array of shapes or a single shape.
     */
    shapes: ShapeNative | Array<ShapeNative>;

    /**
     * Integer Number of segments per shape. 
     * Default is 12.
     * FIXME, changing this will have no effect, it will always be 12.
     */
    curveSegments?: number;
  };

  /** 
   * Sets whether to build a buffered geometry
   * Default is false.
   */
  buffer?: boolean;
}

export class Shape extends MeshComponent {

  /**
   * @description Creates an one-sided polygonal geometry from one or more path shapes.
   * @constructor
   * @param params parameters
   */
  constructor(params: ShapeParams);

  /**
   * Build lifecycle creates a mesh using input params.
   * @param params 
   */
  build(params?: ShapeParams): Mesh;

  /**
   * Builds the geometry
   * @param params 
   */
  buildGeometry(params?: ShapeParams): ShapeGeometry | ShapeBufferGeometry;
}
