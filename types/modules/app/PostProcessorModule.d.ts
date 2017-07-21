import {Material} from 'three';

/**
 * PostProcessorModule properties
 */
interface PostProcessorModuleParams {

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
   * Adds RenderPass
   */
  render(): PostProcessorModule;

  /**
   * Adds the given pass to the composer.
   * Also sets the pass as the current one.
   * TODO define pass type
   * @param pass the pass to add.
   */
  pass(pass: any): PostProcessorModule;

  /**
   * Adds a pass made from shader material.
   * Also sets the shader pass as the current pass.
   * @param material the ShaderMaterial. May contain uniform identified by the textureID
   * @param textureID the textureID, for the uniform. Name of the readBuffer uniform, Default is readBuffer.
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
   * FIXME, this method seems to be going away
   * @param name 
   */
  name(name: string): PostProcessorModule;
}
