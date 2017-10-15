import {
  LightComponent,
  LightComponentParams
} from '../../core';

export interface HemisphereLightParams extends LightComponentParams {
  /** hexadecimal color of the sky, Default is 0xffffff. */
  skyColor?: number,

  /** hexadecimal color of the ground. Default is 0xffffff. */
  groundColor?: number,

  /** Intensity/strength of the light. Default is 1. */
  intensity?: number
}

export class HemisphereLight extends LightComponent {

  /**
   * @constructor Creates an hemisphere light.
   * @param params parameters
   */
  constructor(params?: HemisphereLightParams);

  /**
   * Builds the light.
   */
  build(): HemisphereLight;

}
