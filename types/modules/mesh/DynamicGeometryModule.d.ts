import {App} from '../../core';

export interface DynamicGeometryParams {

  /**
   * Sets whether to use attributes.
   * Default is false.
   */
  attributes?: boolean;

  /**
   * TODO alex to explain
   * Map of geometry parameters
   */
  geometry?: Map<string, any>;
} 

export class DynamicGeometryModule {

  /**
   * @constructor Creates a dynamic geometry module.
   * @param params the parameters.
   */
  constructor(params?: DynamicGeometryParams);
}
