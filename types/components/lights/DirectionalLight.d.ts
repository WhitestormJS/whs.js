import {
  LightComponent,
  LightComponentParams
} from '../../core';

export interface DirectionalLightParams extends LightComponentParams {
  /** hexadecimal color of the light. Default is 0xffffff (white). */
  color: number,

  /** Intensity/strength of the light, Default is 1. */
  intensity: number
}

export class DirectionalLight extends LightComponent {

  /**
   * @constructor Creates a directional light
   * @param params parameters
   */
  constructor(params: DirectionalLightParams);

  /**
   * Builds the directional light
   */
  build(): DirectionalLight;

}
