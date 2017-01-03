export class ModuleManager {
  constructor(app) {
    this.app = app;
    this.currentModule = null;
    this.store = {};
    this.updateMap = {};
  }

  setActiveModule(module) {
    this.currentModule = module;
  }

  reset() {
    this.currentModule = null;
  }

  onDependencyUpdate(depsMap = {}) {
    for (let key in depsMap) {
      if (!this.updateMap[key]) {
        this.updateMap[key] = [depsMap[key]];
      } else {
        this.updateMap[key].push(depsMap[key]);
      }
    }
  }

  addDependency(key, object, config) {
    if (this.store[key] && this.store[key][2].immutable) {
      console.error(
        `@ModuleManager: Dependency '${key}' is immutable and already used by another module`,
        [this.store[key][1], this.currentModule]
      );

      return;
    }

    this.store[key] = [object, this.currentModule, config];

    if (config.alias) {
      Object.defineProperty(this.app, config.alias, {
        get: () => {
          return this.store[key][0];
        },
        set: (value) => {
          if (this.store[key] && this.store[key][2].immutable) {
            console.error(
              `@ModuleManager: Dependency '${key}' is immutable and already used by another module`,
              [this.store[key][1], this.currentModule]
            );

            return;
          }

          this.store[key][0] = value;

          if (this.updateMap[key]) {
            for (let i = 0, max = this.updateMap[key].length; i < max; i++) {
              this.updateMap[key][i](value);
            }
          }
        },
        enumerable: true,
        configurable: true
      });
    }

    if (this.updateMap[key]) {
      for (let i = 0, max = this.updateMap[key].length; i < max; i++) {
        this.updateMap[key][i](object);
      }
    }
  }

  get(key, getModule = false) {
    if (!this.store[key]) {
      console.error(
        `@ModuleManager: Module requires '${key}' dependency`,
        [this.currentModule]
      );

      return;
    }

    return getModule ? this.store[key][1] : this.store[key][0];
  }
}
