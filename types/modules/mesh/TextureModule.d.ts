import {
  Wrapping,
  Mapping,
  Vector2
  } from 'three';
import {App} from '../../core';

/**
 * Texture properties
 */
export interface TextureParams {

  /**
   * The path to the texture (e.g URL)
   */
  url: string,

  /**
   * The type of map (e.g bumpMap)
   * Default is map
   */
  type?: string,

  /**
   * Offset of the texture.
   * Default is Vector2(0, 0)
   */
  offset?: Vector2,

  /**
   * Repeat
   * Default is Vector2(1, 1)
   */
  repeat?: Vector2,

  /**
   * Sets wrapS and wrapT.
   * This defines how the texture is wrapped horizontally and vertically, corresponds to UV mapping.
   * Default is RepeatWrapping.
   */
  wrap?: Wrapping,

  /**
   * How the image is applied to the object.
   * An object type of THREE.UVMapping is the default, where the U,V coordinates are used to apply the map.
   */
  mapping?: Mapping,

  /**
   * Function to set more granular parameters
   * e.g const fix = texture => {
   *   texture.anisotropy = 2;
   *   texture.magFilter = THREE.LinearFilter;
   *   texture.minFilter = THREE.LinearMipMapLinearFilter;
   *   return texture;
   * };
   */
  fix?: Function
}

export class TextureModule {

  /**
   * @constructor Creates a texture module.
   * @param textures the texture(s) properties
   */
  constructor(textures: TextureParams | TextureParams[]);
}
