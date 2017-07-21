import {ModuleManager} from '../../core';

/**
 * This one is used in the core to handle events used by modules.
 * If you want to make custom events, make a similar one.
 */
export class EventsPatchModule {

  /**
   * TODO define type for params
   * @param manager the manager
   */
  manager(manager?: ModuleManager): void;

  /**
   * This methods patches the list of events on specific object.
   * @param originObject the object that gives events.
   * @param destObject the object that takes events. Default is this.
   * @param events the array of events by names (e.g mouseup).
   */
  patchEvents(originObject: any, destObject?: any, events?: Array<string>): void;

  /**
   * @param self this module
   */
  integrate(self: EventsPatchModule): void;

  // TODO completes other methods
}
