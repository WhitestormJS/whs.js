import {MeshComponent, MeshParameters} from '../../core/MeshComponent';
import {Material} from 'three';

interface BoxParameters extends MeshParameters {
  geometry?: {
    width?: number;
    height?: number;
    depth?: number;
    widthSegments?: number;
    heightSegments?: number;
    depthSegments?: number;
  }
}

 export class Box extends MeshComponent {

   /**
    * @param params
    */
   constructor(params?: BoxParameters);
}
