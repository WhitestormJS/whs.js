export class DefineModule {

   /**
   * @constructor Creates a Define Module.
   * @param name name of the module
   * @param data module data
   */
  constructor(name: String, data: Object);

  /**
   * Plays the given clip name
   * @param clipName - the clip name to play
   */
  play(clipName: string): void;
} 