import {system} from '../polyfill';
import {ModuleSystem} from './ModuleSystem';
import {ModuleManager} from './ModuleManager';

class App extends ModuleSystem {
  simulate = false;
  updateEnabled = true;
  loops = [];

  constructor(modules = []) {
    super();
    this.manager = new ModuleManager(this);
    this.modules = modules;

    this.integrateModules();
  }

  // CONTROLS & UPDATING

  start() {
    const requestAnimFrame = (() => {
      return system.window.requestAnimationFrame
        || system.window.webkitRequestAnimationFrame
        || system.window.mozRequestAnimationFrame
        || function (callback) {
          system.window.setTimeout(callback, 1000 / 60);
        };
    })();

    const {loops, updateEnabled} = this;

    function process() {
      requestAnimFrame(process);
      if (!updateEnabled) return;

      for (let i = 0, ll = loops.length; i < ll; i++) {
        const e = loops[i];
        if (e.enabled) e.execute(e.clock);
      }
    }

    this.updateEnabled = true;
    process();
  }

  stop() {
    this.updateEnabled = false;
  }

  addLoop(loop) {
    return new Promise(resolve => {
      this.loops.push(loop);
      resolve(loop);
    });
  }

  removeLoop(loop) {
    return new Promise(resolve => {
      this.loops.filter(l => l !== loop);
      resolve(loop);
    });
  }
}

export {
  App
};
