import {App, ModuleManager} from '../../core';

export class ControlsModule {

  /**
   * TODO define params type
   * @constructor Creates a controls module.
   * @param params the parameters.
   */
  constructor(params?: any);

  /**
   * @param self this module
   */
  integrate(self: ControlsModule): void;

  /**
   * @param manager the manager
   */
  manager(manager: ModuleManager): void;

  /**
   * Sets controls 
   * @param controls Working three.js controls object.
   */
  setControls(controls?: object): ControlsModule;

  /**
   * Sets controls update function
   * @param update Update function
   */
  setUpdate(update?: Function): ControlsModule;
}
