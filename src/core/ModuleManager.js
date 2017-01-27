import {DependencyError} from './errors';

export class ModuleManager {
  constructor(object) {
    this.handler = object;
    this.currentModule = null;
    this.store = {};
    this.updateMap = {};
  }

  // SETTING ACTIVE MODULE

  active(module) {
    this.currentModule = module;
  }

  reset() {
    this.currentModule = null;
  }

  // DEPENDENCIES

  update(depsMap = {}) {
    for (const key in depsMap) {
      if (this.updateMap[key])
        this.updateMap[key].push(depsMap[key]);
      else
        this.updateMap[key] = [depsMap[key]];
    }
  }

  add(key, object, config = {}) {
    if (this.store[key] && this.store[key][2].immutable) {
      throw new DependencyError(
        'ModuleManager',
        `Dependency '${key}' is immutable and already used by another module`,
        this.currentModule, this.store[key][1]
      );
    }

    this.store[key] = [object, this.currentModule, config];

    if (config.alias) {
      Object.defineProperty(this.handler, config.alias, {
        get: () => {
          return this.store[key][0];
        },
        set: value => {
          if (this.store[key] && this.store[key][2].immutable) {
            throw new DependencyError(
              'ModuleManager',
              `Dependency '${key}' is immutable and already used by another module`,
              this.currentModule, this.store[key][1]
            );
          }

          this.store[key][0] = value;

          if (this.updateMap[key]) {
            for (let i = 0, max = this.updateMap[key].length; i < max; i++)
              this.updateMap[key][i](value);
          }
        },
        enumerable: true,
        configurable: true
      });
    }

    if (this.updateMap[key]) {
      for (let i = 0, max = this.updateMap[key].length; i < max; i++)
        this.updateMap[key][i](object);
    }
  }

  remove(key) {
    this.store[key] = null;
  }

  get(key, getModule = false) {
    if (!this.store[key]) {
      throw new DependencyError(
        'ModuleManager',
        `Module requires '${key}' dependency`,
        this.currentModule
      );
    }

    return getModule ? this.store[key][1] : this.store[key][0];
  }

  has(key) {
    return Boolean(this.store[key]);
  }

  // ALIAS METHODS

  set(key, value) {
    this.add(key, value, this.store[key][2] || {});
  }
}
