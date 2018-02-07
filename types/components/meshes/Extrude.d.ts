import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  BufferGeometry,
  CurvePath,
  ExtrudeGeometry,
  Mesh,
  Shape,
  Vector
} from 'three';

export interface ExtrudeParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry: {
    shapes: Shape | Array<Shape>,
    options?: {
      /**
       * Number of points on the curves. 
       * Default is 12.
       */
      curveSegments?: number;

      /**
       * Number of points used for subdividing segments along the depth of the extruded spline. 
       * Default is 1.
       */
      steps?: number; 

      /**
       * Depth to extrude the shape. Default is 100.
       */
      amount?: number;

      /**
       * Apply beveling to the shape. 
       * Default is true.
       */
      bevelEnabled?: boolean;
      
      /**
       * How deep into the original shape the bevel goes. 
       * Default is 6.
       */
      bevelThickness?: number;
      
      /**
       * Distance from the shape outline that the bevel extends. 
       * Default is bevelThickness minus 2.
       */
      bevelSize?: number;

      /**
       * Number of bevel layers. 
       * Default is 3.
       */
      bevelSegments?: number;

      /**
       * A 3D spline path along which the shape should be extruded (creates Frames if frames aren't defined).
       */
      extrudePath?: CurvePath<Vector>;

      /**
       * An object containing arrays of tangents, normals, binormals for each step along the extrudePath.
       */
      frames?: Object;

      /**
       * An object that provides UV generator functions
       */
      UVGenerator?: Object; 
    }
  };

  /**
   * Whether to create buffered geometry or not.
   * Default is false.
   */
  buffer?: boolean;
}

export interface ExtrudeParamsOptions {
  
}

 export class Extrude extends MeshComponent {

   /**
    * @description Creates an extruded geometry from a path shape.
    * @constructor
    * @param params parameters
    */
   constructor(params?: ExtrudeParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: ExtrudeParams): Mesh;

   /**
    * Builds the geometry
    * @param params 
    */
   buildGeometry(params?: ExtrudeParams): ExtrudeGeometry | BufferGeometry;
}
