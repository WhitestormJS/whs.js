import {ModuleManager} from '../../core';

export class EventsPatchModule {

  /**
   * TODO define type for params
   * @param manager the manager
   */
  manager(manager?: ModuleManager): void;

  /**
   * 
   * @param originObject 
   * @param destObject 
   * @param events the array of events (e.g mouseup)
   */
  patchEvents(originObject: any, destObject: any, events: Array<string>): void;

  /**
   * TODO define type for params
   * @param self this module
   */
  integrate(self: EventsPatchModule): void;

  // TODO completes other methods
}
