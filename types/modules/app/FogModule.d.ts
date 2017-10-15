/**
 * FogModule properties
 */
export interface FogModuleParams {

  /**
   * Fog color. Example: If set to black, far away objects will be rendered black.
   * Default is 0xefd1b5.
   */
  color?: number;

  /**
   * Fog density defines how fast the fog will grow dense.
   * Only applies to exp2 type of fog.
   * 
   * Default is 0.02.
   */
  density?: number;

  /**
   * The minimum distance to start applying fog. 
   * Objects that are less than 'near' units from the active camera won't be affected by fog.
   * Default is 0.02.
   */
  near?: number;

  /**
   * The maximum distance at which fog stops being calculated and applied. 
   * Objects that are more than 'far' units away from the active camera won't be affected by fog.
   * Default is 1000.
   */
  far?: number;
} 

export class FogModule {

  /**
   * @constructor Creates a fog module.
   * @param params parameters
   * @param type the type of fog, either 'linear' or 'exp2'. Default is exp2
   */
  constructor(params?: FogModuleParams, type?: string);
}
