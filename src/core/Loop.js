import {Clock} from 'three';

/**
 * @class Loop
 * @category core
 * @param {Function} func function to execute on each animation frame
 * @param {Boolean} [useClock=true] passes a Clock to the function when called, if true
 * @memberof module:core
 */
class Loop {
  constructor(func, useClock = true) {
    this.func = func;
    this.clock = useClock ? new Clock() : null;
    this.enabled = false;
  }

  // CONTROLS

  /**
   * @method start
   * @instance
   * @description Starts this loop, clock if it has one. Won't do anything if loop enabled already.
   * @param {Component} [world] app to add this loop to, if provided.
   * @memberof module:core.Loop
   */
  start(world) {
    if (this.enabled) return;

    if (world) world.addLoop(this);

    if (this.clock) this.clock.start();
    this.enabled = true;
  }

  /**
   * @method stop
   * @instance
   * @description Stops this loop and its clock if it has one, won't do anything if this loop is not enabled)
   * @param {Component} [world] app to remove this loop from, if provided.
   * @memberof module:core.Loop
   */
  stop(world) {
    if (!this.enabled) return;

    if (this.clock) this.clock.stop();
    this.enabled = false;

    if (world) world.removeLoop(this);
  }

  // EXECUTION

  /**
   * @method execute
   * @instance
   * @description Executes the function of this loop
   * @memberof module:core.Loop
   * @returns {*} whatever the function of this loop returns
   */
  execute() {
    return this.func(this.clock);
  }
}

export {
  Loop
};
