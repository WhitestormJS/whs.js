import {Object3D} from 'three';
import Events from 'minivents';

import {extend, transformData} from '../utils/index';

export const getWorld = (element) => {
  let world = element;
  if (!world.$scene) while (!world.$scene) world = world.parent;
  return world;
};

class Component extends Events {
  static defaults = {
    modules: []
  };

  static instructions = {};

  _wait = [];
  children = [];
  modules = [];
  params = {};

  constructor(obj = {}, defaults = Component.defaults, instructions = Component.instructions) {
    super();

    if (obj instanceof Object3D) this.native = obj;
    else this.params = extend(transformData(obj, instructions), defaults);

    this.modules = this.params.modules || [];
    const modules = this.modules;
    const modulesSharedScope = {};

    for (let i = 0, max = modules.length; i < max; i++) {
      const module = modules[i];
      if (typeof module === 'function') module.bind(modulesSharedScope)().integrate.bind(this)(module.params, module);
      else module.integrate.bind(this)(module.params, module);
    }
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
      for (let key in bridgeMap) {
        const module = modules[i];

        if (module.bridge && module.bridge[key])
          bridgeMap[key] = module.bridge[key].apply(this, [bridgeMap[key], module]);
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
