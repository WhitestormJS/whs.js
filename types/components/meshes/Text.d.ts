import {MeshComponent, MeshComponentParams} from '../../core/MeshComponent';
import {
  Font,
  Mesh,
  TextGeometry,
  FontLoader
} from 'three';

interface TextParams extends MeshComponentParams {

  /** Parameters */
  parameters?: {

      /** 
       * Size of the text. 
       * Default is 12. 
       */
      size?: number;

      /** 
       * Thickness to extrude text. 
       * Default is 50. 
       */
      height?: number;

      /** 
       * Number of points on the curves. 
       * Default is 12. 
       */
      curveSegments?: number;

      /** 
       * an instance of THREE.Font.
       */
      font?: Font;

      /** 
       * Turn on bevel. 
       * Default is false. 
       */
      bevelEnabled?: boolean;

      /** 
       * How deep into text bevel goes. 
       * Default is 10. 
       */
      bevelThickness?: number;

      /** 
       * How far from text outline is bevel. 
       * Default is 8. 
       */
      bevelSize?: number;

      /** 
       * Number of bevel segments. 
       * Default is 3. 
       */
      bevelSegments?: number;
      
  }
}

 export class Text extends MeshComponent {
   /**
    * @constructor Creates Text
    * @param params
    */
   constructor(params?: TextParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: TextParams): Mesh;
}
