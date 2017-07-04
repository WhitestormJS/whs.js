import {MeshComponent, MeshComponentParams} from '../../core/MeshComponent';

interface SphereParameter extends MeshComponentParams {
  geometry?: {
      radius?: number;
      widthSegments?: number;
      heightSegments?: number;
      phiStart?: number;
      phiLength?: number;
      thetaStart?: number;
      thetaLength?: number;
  }
}

 export class Sphere extends MeshComponent {

   /**
    * @param params
    */
   constructor(params?: SphereParameter);
}
