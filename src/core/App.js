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

    function process() {
      if (this.updateEnabled) {
        requestAnimFrame(process.bind(this));

        for (let i = 0; i < this.loops.length; i++) {
          const e = this.loops[i];
          if (e.enabled) e.execute(e.clock);
        }
      }
    }

    this.updateEnabled = true;
    (process.bind(this))();
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
