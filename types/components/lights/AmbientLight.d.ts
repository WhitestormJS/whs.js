import {
  LightComponent
} from '../../core';

export interface AmbientLightParams {
  /** hexadecimal color of the light. Default is 0xffffff (white). */
  color: number,

  /** Intensity/strength of the light, Default is 1. */
  intensity: number
}

export class AmbientLight extends LightComponent {

  /**
   * @constructor Creates an ambient light
   * @param params parameters
   */
  constructor(params: AmbientLightParams);

  /**
   * Builds the ambient light
   */
  build(): AmbientLight;

}
