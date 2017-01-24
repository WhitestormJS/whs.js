import {system} from '../polyfill';
import {ModuleManager} from './ModuleManager';

class App {
  simulate = false;
  render = true;
  loops = [];

  constructor(modules = []) {
    this.modules = modules;
    this.manager = new ModuleManager(this);

    for (let i = 0, max = modules.length; i < max; i++)
      this.applyModule(modules[i]);

    this.manager.reset();
  }

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
      requestAnimFrame(process.bind(this));

      for (let i = 0; i < this.loops.length; i++) {
        const e = this.loops[i];
        if (e.enabled) e.execute(e.clock);
      }
    }

    (process.bind(this))();
  }

  applyModule(module) {
    if (typeof module === 'function')
      module.bind(this)();
    else {
      this.manager.setActiveModule(module);
      if (module && module.manager) module.manager(this.manager);
      if (module && module.integrate) module.integrate.bind(this)(module.params, module);
    }

    return module;
  }

  module(module) {
    this.applyModule(module);
    return this;
  }

  addLoop(loop) {
    return new Promise((resolve) => {
      this.loops.push(loop);
      resolve(loop);
    });
  }

  removeLoop(loop) {
    return new Promise((resolve) => {
      this.loops.filter((l) => l !== loop);
      resolve(loop);
    });
  }

  applyBridge(bridgeMap = {}) {
    const modules = this.modules;

    for (let i = 0, max = modules.length; i < max; i++) {
      for (const key in bridgeMap) {
        if (bridgeMap[key]) {
          const module = modules[i];

          if (module && module.bridge && module.bridge[key])
            bridgeMap[key] = module.bridge[key].apply(this, [bridgeMap[key], module]);
        }
      }
    }

    return bridgeMap;
  }
}

export {
  App
};
