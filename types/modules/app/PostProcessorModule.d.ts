import {Material} from 'three';

/**
 * PostProcessorModule properties
 */
export interface PostProcessorModuleParams {

  /**
   * Sets whether to debug or not.
   * Default is true.
   */
  debug?: boolean;
} 

export class PostProcessorModule {

  /**
   * 
   * @constructor Creates a Post Processor module.
   * @param params parameters
   */
  constructor(params?: PostProcessorModuleParams);

  /**
   * Renders
   */
  render(): PostProcessorModule;

  /**
   * Adds the given pass to the composer.
   * Also sets the pass as the current one.
   * @param pass the pass to add.
   */
  pass(pass: any): PostProcessorModule;

  /**
   * Adds the given material as Shader pass
   * Also sets the shader pass as the current pass.
   * @param material the material to add, may contain uniform identified by the textureID
   * @param textureID the textureID, for the uniform. Default is readBuffer.
   */
  shader(material: Material, textureID?: string): PostProcessorModule;

  /**
   * Returns the pass with the given name or the current pass if not found.
   * @param name the pass to retreive.
   */
  get(name: string): any;
  
  /**
   * Sets the current pass
   * @param name 
   */
  to(name: string): void;

  /**
   * Sets whether to render to screen.
   * @param bool flag. Default is true.
   */
  renderToScreen(bool?: boolean): PostProcessorModule;

  /**
   * Same as to, but using defer
   * @param name 
   */
  name(name: string): PostProcessorModule;
}
