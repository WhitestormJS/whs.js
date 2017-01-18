import {ModuleManager} from './ModuleManager';

class App {
  simulate = false;
  render = true;
  loops = [];

  constructor(modules = []) {
    this.modules = modules;
    this.manager = new ModuleManager(this);

    for (let i = 0, max = modules.length; i < max; i++) {
      const module = modules[i];

      if (typeof module === 'function')
        module.bind(this)();
      else {
        if (!module.name) module.name = '';
        this.manager.setActiveModule(module);
        if (module.manager) module.manager(this.manager);
        if (module.integrate) module.integrate.bind(this)(module.params, module);
      }
    }

    this.manager.reset();
  }

  start() {
    window.requestAnimFrame = (() => {
      return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    function process() {
      window.requestAnimFrame(process.bind(this));

      for (let i = 0; i < this.loops.length; i++) {
        const e = this.loops[i];
        if (e.enabled) e.execute(e.clock);
      }
    }

    (process.bind(this))();
  }

  applyModule(module) {
    if (typeof module === 'function')
      module.bind(this.modulesSharedScope)().integrate.bind(this)(module.params, module);
    else {
      this.modules.push(module);
      if (!module.name) module.name = '';
      this.manager.setActiveModule(module);
      if (module.manager) module.manager(this.manager);
      if (module.integrate) module.integrate.bind(this)(module.params, module);
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

          if (module.bridge && module.bridge[key])
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
