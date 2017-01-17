import Events from 'minivents';

import {extend, transformData} from '../utils/index';
import {ModuleManager} from './ModuleManager';
import {ManagerError} from './errors';

export const getWorld = (element) => {
  let world = element;
  if (!world.$scene) while (!world.$scene) world = world.parent;
  return world;
};

class Component extends Events {
  static defaults = {
    modules: [],
    manager: true
  };

  static instructions = {};

  _wait = [];
  children = [];
  modules = [];
  params = {};

  constructor(obj = {}, defaults = Component.defaults, instructions = Component.instructions) {
    super();

    this.params = extend(transformData(obj, instructions), defaults);
    if (this.params.manager) this.manager = new ModuleManager();

    this.modules = this.params.modules || [];
    const modules = this.modules;

    for (let i = 0, max = modules.length; i < max; i++) {
      const module = modules[i];

      if (typeof module === 'function')
        module.bind(this)();
      else {
        if (!module.name) module.name = '';
        if (this.manager) this.manager.setActiveModule(module);

        if (module.manager && this.manager) module.manager(this.manager);
        else if (module.manager) {
          throw new ManagerError(
            'Component',
            `Module requires ModuleManager that is turned off for this component`,
            this, module
          );
        }

        if (module.integrate) module.integrate.bind(this)(module.params, module);
      }
    }
  }

  get manager() {
    if (this._manager) return this._manager;

    throw new ManagerError(
      'Component',
      `ModuleManager is not used in this component. 'manager' parameter should be set as 'true'`,
      this
    );
  }

  set manager(manager) {
    this._manager = manager;
  }

  wait(promise) {
    if (promise) this._wait.push(promise);
    return Promise.all(this._wait);
  }

  defer(func) {
    if (this.isDeffered) this.wait().then(func);
    else func();
  }

  get isDeffered() {
    return this._wait.length > 0;
  }

  updateParams(params = {}) {
    this.params = extend(params, this.params);
    return this.params;
  }

  clone() {
    return new this.constructor(this.params).copy(this);
  }

  copy(source) {
    if (source.native) {
      this.native = source.native.clone(source.params);
      this.params = {...source.params};
    } else this.params = source.params;

    return this;
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

  get native() {
    return this._native;
  }

  set native(mesh) {
    this._native = mesh;
    this._native.component = this;
    return this._native;
  }
}

export {
  Component
};
