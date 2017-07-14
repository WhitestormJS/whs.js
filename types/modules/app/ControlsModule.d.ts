import {App, ModuleManager} from '../../core';

export class ControlsModule {

  /**
   * TODO define type for params
   * @constructor Creates a controls module.
   * @param params the parameters.
   */
  constructor(params?: any);

  /**
   * TODO define type for params
   * @param self this module
   */
  integrate(self: ControlsModule): void;

  /**
   * TODO define type for params
   * @param manager the manager
   */
  manager(manager: ModuleManager): void;

  /**
   * TODO define type
   * Sets controls 
   * @param controls - the controls
   */
  setControls(controls?: any): void;

  /**
   * TODO define type
   * Sets update 
   * @param update 
   */
  setUpdate(update?: any): ControlsModule;
}
