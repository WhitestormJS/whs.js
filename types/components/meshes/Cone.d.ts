import {MeshComponent, MeshComponentParams} from '../../core/MeshComponent';

interface ConeParameters extends MeshComponentParams {
  geometry?: {
    radius?: number;
    height?: number;
    radiusSegments?: number;
    heightSegments?: number;
    openEnded?: number;
    thetaStart?: number;
    thetaLength?: number;
  }
}

 export class Cone extends MeshComponent {

   /**
    * @param params
    */
   constructor(params?: ConeParameters);
}
