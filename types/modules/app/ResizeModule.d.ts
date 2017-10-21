/**
 * ResizeModule properties
 */
export interface ResizeModuleParams {

  /**
   * Sets whether to auto resize.
   * When set to true, resize will be triggered when container resizes.
   * Default is true.
   */
  auto?: boolean;
} 


export class ResizeModule {

  /**
   * 
   * @constructor Creates a resize module.
   * @param params parameters
   */
  constructor(params?: ResizeModuleParams);

  /**
   * Sets the provided width & height to the renderer object.
   * @param width the width. Default is 1.
   * @param height the height. Default is 1.
   */
  setSize(width?: number, height?: number): void;

  /**
   * Triggers resize when called. width & height are determined automatically
   * This invokes each callbacks with the new width and height as params
   */
  trigger(): void;

  /**
   * Sets module to autoresize, this adds an event listener on window resize to trigger the resize.
   */
  addAutoresize(): void;

  /**
   * Adds a call back function to the existing callbacks list.
   * @param func the callback function to add
   */
  addCallback(func: Function): void;
}
