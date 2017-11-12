import {
  MeshComponent,
  MeshComponentParams
} from '../../core/MeshComponent';

import {
  Mesh,
  AnyLoader,
} from 'three';

export interface ImporterParams extends MeshComponentParams {

  /**
   * Loader.
   * Default to THREE.JSONLoader.
   */
  loader?: AnyLoader;

  /**
   * Specific parser function.
   * Defaults is a geometry and material parser returning the native (Mesh) object.
   */
  parser?: Function;

  /**
   * The URL of the model to import.
   * Default is ''.
   */
  url?: string;

  /**
   * Will be called when load starts.
   * The default is a function with empty body.
   */
  onLoad?: Function;

  /**
   * Will be called while load progresses.
   * The default is a function with empty body.
   */
  onProgress?: Function;

  /**
   * Will be called while load faces an error.
   * The default is a function with empty body.
   */
  onError?: Function;

  /**
   * Set the base path or URL from which to load files.
   * This can be useful if you are loading many files from the same directory.
   * Default is null.
   */
  texturePath?: string;
}

 export class Importer extends MeshComponent {

   /**
    * @description Creates an importer of meshes and any other data to your scene.
    * @constructor
    * @param params parameters
    */
   constructor(params?: ImporterParams);

   /**
    * Build lifecycle creates a mesh using input params.
    * @param params
    */
   build(params?: ImporterParams): Mesh;

}
