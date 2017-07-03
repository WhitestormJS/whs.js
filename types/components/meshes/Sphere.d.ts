import {MeshComponent, MeshParameters} from '../../core/MeshComponent';

interface SphereParameter extends MeshParameters {
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
