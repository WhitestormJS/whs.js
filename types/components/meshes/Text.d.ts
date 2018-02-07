import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  Font,
  Mesh,
  TextGeometry,
  FontLoader
} from 'three';

export interface TextParams extends MeshComponentParams {

  /** Test to display, defaults to Hello World  */
  text?: string,

  /** The font of the text */
  font: Font | Promise<Font>,

  /** Geometry params */
  geometry?: {

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
  }
}

 export class Text extends MeshComponent {
   /**
    * @description Creates a Text
    * @constructor
    * @param params
    */
   constructor(params?: TextParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params 
    */
   build(params?: TextParams): Promise<Mesh>;
}
