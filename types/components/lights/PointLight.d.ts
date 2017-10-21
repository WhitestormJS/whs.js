import {
  LightComponent,
  LightComponentParams
} from '../../core';

export interface PointLightParams extends LightComponentParams {
  /** hexadecimal color of the light. Default is 0xffffff (white). */
  color?: number,

  /** Intensity/strength of the light, Default is 1. */
  intensity?: number,

  /** 
   * The distance from the light where the intensity is 0. 
   * When set to 0, then the light never stops. Default is 100.
   */
  distance?: number,
  
  /** 
   * The amount the light dims along the distance of the light. 
   * Default is 1. For physically correct lighting, set this to 2.
   */
  decay?: number
}

export class PointLight extends LightComponent {

  /**
   * @constructor Creates a point light
   * @param params parameters
   */
  constructor(params: PointLightParams);

  /**
   * Builds the point light
   */
  build(): PointLight;

}
