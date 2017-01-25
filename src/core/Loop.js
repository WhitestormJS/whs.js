import {Clock} from 'three';

class Loop {
  constructor(func, useClock = true) {
    this.func = func;
    this.clock = useClock ? new Clock() : null;
    this.enabled = false;
  }

  // CONTROLS

  start(world) {
    if (this.enabled) return;

    if (world) world.addLoop(this);

    if (this.clock) this.clock.start();
    this.enabled = true;
  }

  stop(world) {
    if (!this.enabled) return;

    if (this.clock) this.clock.stop();
    this.enabled = false;

    if (world) world.removeLoop(this);
  }

  // EXECUTION

  execute() {
    return this.func(this.clock);
  }
}

export {
  Loop
};
