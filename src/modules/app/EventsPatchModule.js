/**
 * @class EventsPatchModule
 * @description This one is used in the core to handle events used by modules. If you want to make custom events - please make a similar one.
 * @category modules/app
 * @memberof module:modules/app
 */
export class EventsPatchModule {
  manager(manager) {
    manager.define('events');
    this.element = manager.get('renderer').domElement;
  }

  /**
   * @function patchEvents
   * @description This methods patches the list of events on specific object.
   * @param {Number} originObject - The object that gives events.
   * @param {Number} [destObject=this] - The object that takes events.
   * @param {Array[Strings]} [events=[]] - The list of events by names.
   * @memberof module:modules/app.EventsPatchModule
   */
  patchEvents(originObject, destObject = this, events = []) {
    events.forEach(event =>
      originObject.addEventListener(event, e => destObject.emit(event, e))
    );
  }

  integrate(self) {
    const {element, patchEvents} = self;

    patchEvents(element, this, [
      'mousemove',
      'mouseup',
      'contextmenu',
      'mousedown',
      'click',
      'wheel',
      'touchstart',
      'touchend',
      'touchmove',
      'keydown',
      'keyup',
      'keypress'
    ]);
  }
}
