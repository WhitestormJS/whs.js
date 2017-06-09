import {createStore} from 'redux';
import {DependencyError} from './errors';

export class ModuleManager {
  constructor(object) {
    this.handler = object;
    this.currentModule = null;

    this.store = createStore((state = [{}, ''], action) => {
      state[0][action.key] = action.data;
      state[1] = action.key;

      return state;
    });

    this.modules = {};
  }

  // SETTING ACTIVE MODULE

  active(module) {
    this.currentModule = module;
  }

  reset() {
    this.currentModule = null;
  }

  // MODULES

  define(name) {
    this.modules[name] = this.currentModule;
  }

  use(name) {
    return this.modules[name];
  }

  // DEPENDENCIES

  set(key, data) {
    this.store.dispatch({
      type: 'ADD',
      key,
      data
    });
  }

  get(key) {
    return this.store.getState()[0][key];
  }

  has(key) {
    return Boolean(this.store.getState()[0][key]);
  }

  update(depsMap = {}) {
    this.store.subscribe(() => {
      const [data, changedKey] = this.store.getState();
      const callback = depsMap[changedKey];

      if (callback) callback(data[changedKey]);
    });
  }

  add(...data) {
    console.warn('.add() method is deprecated. Use .set() instead');
    return this.set(...data);
  }
}
