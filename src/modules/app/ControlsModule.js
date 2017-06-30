import {Loop} from '../../core/Loop';
import {EventsPatchModule} from './EventsPatchModule';

export class ControlsModule {
  static from(controls) {
    return new ControlsModule({controls});
  }

  constructor(params = {}) {
    this.params = Object.assign({
      controls: false,
      fix: controls => controls,

      update(c) {
        this.controls.update(c.getDelta());
      }
    }, params);

    this.controls = this.params.controls;
    this.update = this.params.update;
  }

  manager(manager) {
    manager.require('events', () => new EventsPatchModule());
  }

  setControls(controls) {
    this.controls = controls;
    return this;
  }

  setUpdate(update) {
    this.update = update;
    return this;
  }

  integrate(self) {
    self.updateLoop = new Loop(self.update.bind(self));
    self.updateLoop.start(this);
  }
}
