import {MeshComponent, MeshComponentParams} from '../../core/MeshComponent';

interface SphereParams extends MeshComponentParams {

  /** Geometry parameters */
  geometry?: {

      /** 
       * Radius of the sphere. 
       * Default is 1. 
       */
      radius?: number;

      /** 
       * Number of horizontal segments. 
       * Minimum value is 3, and the default is 8. 
       */
      widthSegments?: number;

      /** 
       * Number of vertical segments. 
       * Minimum value is 2, and the default is 6. 
       */
      heightSegments?: number;


      phiStart?: number;
      phiLength?: number;
      thetaStart?: number;
      thetaLength?: number;
  }
}

interface BufferedSphereParams extends SphereParams {

  /** Sets whether to build a buffered geometry */
  buffer?: boolean
} 

 export class Sphere extends MeshComponent {

   /**
    * @constructor Creates a Sphere
    * @param params
    */
   constructor(params?: SphereParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: SphereParams);

   /**
    * Build the geometry
    * @param params 
    */
   buildGeometry(params?: BufferedSphereParams);
}
