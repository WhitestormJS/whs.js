import {Vector2} from 'three';

/**
 * RenderingModule properties
 */
export interface RenderingModuleParams {

  /**
   * Width of the rendering
   * Default is window.innerWidth
   */
  width?: number;

  /**
   * Height of the rendering.
   * Default is window.innerHeight.
   */
  height?: number;
  
  /**
   * Resolution.
   * Default is Vector2(1, 1).
   */
  resolution?: Vector2;

  /**
   * Pixel ratio.
   * Default is window.devicePixelRatio.
   */
  pixelRatio?: number;
  
  /**
   * Background color.
   * Default is 0x000000 (black).
   */
  bgColor?: number;

  /**
   * Background opacity (takes value between 0 and 1).
   * Default is 1.
   */
  bgOpacity?: number;

  /**
   * WebGLRenderer parameters
   * Default is no params.
   */
  renderer?: object;
} 

export interface RenderingModuleShadowParam {

  /**
   * Sets whether to use shadow.
   * Default is false.
   */
  shadow?: boolean,
} 

export class RenderingModule {

  /**
   * 
   * @constructor Creates a rendering module.
   * @param params parameters
   * @param shadow shadow flag
   */
  constructor(params?: RenderingModuleParams, shadow?: RenderingModuleShadowParam);

  /**
   * Applies additional ??
   * @param name TODO
   * @param isApplied will not apply if false. Default is false.
   */
  applyAdditional(name: string, isApplied?: boolean): void;

  /**
   * 
   * @param effect 
   * @param cb 
   */
  effect(effect: any, cb?: Function): void;

  /**
   * Sets resolution of the renderer
   * @param width width of the renderer
   * @param height height of the renderer
   */
  setSize(width: number, height: number): void;

  /**
   * Attaches the render to the given element
   * @param element element to append a child to.
   */
  attachToCanvas(element: HTMLElement): void;
  
  /**
   * Stops rendering, also stops all effect loops associated.
   */
  stop(): void;

  /**
   * (re)Start rendering, also starts all effect loops.
   */
  play(): void;
}
