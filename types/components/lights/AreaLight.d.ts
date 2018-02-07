import {
  LightComponent,
  LightComponentParams
} from '../../core';

export interface AreaLightParams extends LightComponentParams {
  /** hexadecimal color of the light. Default is 0xffffff (white). */
  color?: number,

  /** Intensity/strength of the light, Default is 1. */
  intensity?: number,

  /** width of the rect area. Default is 10. */
  width?: number,
  /** height of the rect area. Default is 10. */
  height?: number
}

export class AreaLight extends LightComponent {

  /**
   * @constructor Creates an area light
   * @param params parameters
   */
  constructor(params: AreaLightParams);

  /**
   * Builds the area light
   */
  build(): AreaLight;

}
