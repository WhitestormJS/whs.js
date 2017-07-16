export class StateModule {

  /**
   * @constructor Creates a state module.
   * @param equalCheck function to determine equality. Default is a standard equality function. See src.
   */
  constructor(equalCheck?: Function);

  /**
   * Add default configuration.
   * @param data Configuration setup
   */
  default(data: object): void;

  /**
   * Sets an equalCheck function
   * @param func function to generate equal check
   */
  setEqualCheck(func: Function): void;

  /**
   * Load configurations from object.
   * @param configs Configuration data
   */
  config(configs: object): void;

  /**
   * Load updates from object.
   * @param updates Updates data. Default is an empty object
   */
  update(updates?: object): void;

  /**
   * Switch to configuration.
   * @param configName Configuration name.
   */
  to(configName: string): void;

  /**
   * Set current parameters.
   * @param configName Configuration parameters.
   */
  set(data: object): void;

  /**
   * Return data of parameter.
   * @param key parameter name.
   */
  get(key: string): any;

  /**
   * Return `trueVal` if `config` match previous configuration, in other case - return `falseVal`.
   * @param config configuration name.
   * @param trueVal value returned if condition is truthy.
   * @param falseVal value returned if condition is falsy.
   */
  prev(config: string, trueVal: any, falseVal: any): any;

  /**
   * Return `trueVal` if `config` match current configuration, in other case - return `falseVal`.
   * @param config configuration name.
   * @param trueVal value returned if condition is truthy.
   * @param falseVal value returned if condition is falsy.
   */
  current(config: string, trueVal: any, falseVal: any): any;

}
