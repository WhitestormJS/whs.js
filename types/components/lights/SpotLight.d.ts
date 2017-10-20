import {
  LightComponent,
  LightComponentParams
} from '../../core';

export interface SpotLightParams extends LightComponentParams {
  /** hexadecimal color of the light. Default is 0xffffff (white). */
  color?: number,

  /** Intensity/strength of the light, Default is 1. */
  intensity?: number,

  /** 
   * Maximum distance from origin where light will shine whose intensity is attenuated linearly based on distance from origin. 
   * Default is 100.
   */
  distance?: number,

  /**
   * Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
   * Default is Math.PI / 3.
   */
  angle?: number,

  /**
   * FIXME, penumbra default is not set in whs src
   * Percent of the spotlight cone that is attenuated due to penumbra. 
   * Takes values between zero and 1. Default is zero.
   */ 
  penumbra?: number,

  /** 
   * The amount the light dims along the distance of the light.
   * Default is 1.
   */
  decay?: number
}

export class SpotLight extends LightComponent {

  /**
   * @constructor Creates a spot light
   * @param params parameters
   */
  constructor(params: SpotLightParams);

  /**
   * Builds the spot light
   */
  build(): SpotLight;
}
