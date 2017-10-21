import {MeshComponent, MeshComponentParams} from '../../core/MeshComponent';
import {
  LineCurve3,
  Mesh,
  TextGeometry
} from 'three';

export interface TubeParams extends MeshComponentParams {

  /** Geometry params */
  geometry?: {

      /** 
       * Curve - A path that inherits from the Curve base class
       * Default is LineCurve3(new Vector3(0, 0, 0), new Vector3(0, 0, 1)). 
       */
      path?: LineCurve3;

      /** 
       * The number of segments that make up the tube. 
       * Default is 20. 
       */
      segments?: number;

      /** 
       * The radius of the tube. 
       * Default is 2. 
       */
      radius?: number;

      /** 
       * The number of segments that make up the cross-section.
       * Default is 8.
       */
      radiusSegments?: number;

      /** 
       * Is the tube open or closed. 
       * Default is false. 
       */
      closed?: boolean;

      
      
  }
}

 export class Tube extends MeshComponent {
   /**
    * @constructor Creates a tube that extrudes along a 3d curve.
    * @param params
    */
   constructor(params?: TubeParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: TubeParams): Mesh;
}
