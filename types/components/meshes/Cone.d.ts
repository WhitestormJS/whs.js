import {MeshComponent, MeshComponentParams} from '../../core/MeshComponent';

interface ConeParams extends MeshComponentParams {
  geometry?: {
    radius?: number;
    height?: number;
    radiusSegments?: number;
    heightSegments?: number;
    openEnded?: boolean;
    thetaStart?: number;
    thetaLength?: number;
  }
}

 export class Cone extends MeshComponent {

   /**
    * @param params
    */
   constructor(params?: ConeParams);
}
