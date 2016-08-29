import * as THREE from 'three';

class Loop {
  constructor(func) {
    this.func = func;
    this.clock = new THREE.Clock();
    this.enabled = false;
  }

  start(world) {
    if (world) world.addLoop(this);

    this.clock.start();
    this.enabled = true;
  }

  stop(world) {
    this.clock.stop();
    this.enabled = false;

    if (world) world.removeLoop(this);
  }

  execute() {
    return this.func(this.clock);
  }
}

export {
  Loop
};
