import Events from 'minivents';

import {ManagerError} from './errors';

export class ModuleSystem extends Events {
  // INTEGRATING

  integrateModules(source) {
    if (source) this.modules = source.modules.slice(0);

    for (let i = 0, max = this.modules.length; i < max; i++)
      this.applyModule(this.modules[i]);

    if (source) this.applyBridge({onCopy: source});
  }

  // APPLYING MODULE (...and a "bridge" for module)

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

  applyModule(module) {
    if (!module) return;
    this.modules.push(module);

    if (this.manager) this.manager.active(module);

    if (module.manager && this.manager) module.manager(this.manager);
    else if (module.manager) {
      throw new ManagerError(
        'Component',
        `Module requires ModuleManager that is turned off for this component`,
        this, module
      );
    }

    if (module.integrate) module.integrate.bind(this)(module);

    return module;
  }

  // PIPED METHOD

  module(module) {
    this.applyModule(module);
    return this;
  }
}
