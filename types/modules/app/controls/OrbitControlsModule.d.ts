import {ControlsModule} from '../ControlsModule';
import {ModuleManager} from '../../../core';


export class OrbitControlsModule extends ControlsModule {

  /**
   * TODO define type for params
   * @constructor Creates a controls module.
   * @param params the parameters.
   */
  constructor(params?: any);

  /**
   * TODO define type for params
   * @param manager the manager
   */
  manager(manager?: ModuleManager): void;
}
