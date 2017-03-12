export class EventsPatchModule {
  manager(manager) {
    this.element = manager.get('element');
  }

  patchEvents(originObject, destObject, events = []) {
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
      'keydown'
    ]);

    patchEvents(element, this, [
      'keydown',
      'keyup',
      'keypress'
    ]);
  }
}
