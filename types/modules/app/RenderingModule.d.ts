import {
  Vector2,
  Scene,
  Camera
} from 'three';

import {Loop} from '../../core';

/**
 * RenderingModule properties
 */
interface RenderingModuleParams {

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

interface RenderingModuleShadowParam {

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
   * Apply additional script from RenderingModule.additional
   * @param name script name
   */
  applyAdditional(name: string): void;


  /**
   * Integrate renderer
   * @param element element DOM object
   * @param scene used scene
   * @param camera used camera
   */
  integrateRenderer(element: HTMLElement, scene: Scene, camera: Camera): Loop;

  /**
   * TODO define effect param
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
   * Resumes rendering, also resumes all effect loops.
   */
  play(): void;

  /**
   * Dispose rendering context
   */
  dispose(): void;
}
