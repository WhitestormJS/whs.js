import {App} from '../../core';

export interface AnimationModuleParams {

  /**
   * Speed of the playing animation.
   * Defalt is 1 (default animation frames).
   */
  speed?: number
} 

export class AnimationModule {

  /**
   * @constructor Creates an animation module.
   * @param app the app.
   * @param isDeferred sets whether to defer the start of the loop, default is false.
   * @param params the parameters.
   */
  constructor(app: App, isDeferred?: boolean, params?: AnimationModuleParams);

  /**
   * Plays the given clip name
   * @param clipName - the clip name to play
   */
  play(clipName: string): void;
}
