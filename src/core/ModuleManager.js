import {DependencyError} from './errors';

export class ModuleManager {
  constructor(object) {
    this.handler = object;
    this.currentModule = null;
    this.store = {};
    this.updateMap = {};
  }

  // SETTING ACTIVE MODULE

  setActiveModule(module) {
    this.currentModule = module;
  }

  reset() {
    this.currentModule = null;
  }

  // DEPENDENCIES

  onDependencyUpdate(depsMap = {}) {
    for (const key in depsMap) {
      if (this.updateMap[key])
        this.updateMap[key].push(depsMap[key]);
      else
        this.updateMap[key] = [depsMap[key]];
    }
  }

  addDependency(key, object, config = {}) {
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
        set: (value) => {
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

  removeDependency(key) {
    this.store[key] = null;
  }

  // ALIAS METHODS

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

  set(key, value) {
    this.addDependency(key, value, this.store[key][2] || {});
  }

  has(key) {
    return Boolean(this.store[key]);
  }

  get publish() {
    return this.addDependency;
  }

  get unpublish() {
    return this.removeDependency;
  }
}
