import {Clock} from 'three';

class Loop {
  constructor(func) {
    this.func = func;
    this.clock = new Clock();
    this.enabled = false;
  }

  start() {
    this.clock.start();
    this.enabled = true;
  }

  stop() {
    this.clock.stop();
    this.enabled = false;
  }

  execute(time) {
    return this.func(this.clock, time);
  }
}

export {
  Loop as default
};
