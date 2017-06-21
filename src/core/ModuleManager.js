import {DependencyError} from './errors';

/**
 * @class ModuleManager
 * @category core
 * @param {Object} object handler
 * @description  Solves modules dependencies
 * @memberof module:core
 */
export class ModuleManager {
  constructor(object) {
    this.handler = object;
    this.currentModule = null;
    this.store = {};
    this.updateMap = {};
  }

  // SETTING ACTIVE MODULE

  /**
   * @method active
   * @description Sets .currentModule to provided module.
   * @param {Object} module the module to make current
   * @memberof module:core.ModuleManager
   */
  active(module) {
    this.currentModule = module;
  }

  /**
   * @method reset
   * @description Set's .currentModule to null.
   * @memberof module:core.ModuleManager
   */
  reset() {
    this.currentModule = null;
  }

  // DEPENDENCIES

  /**
   * @method update
   * @description Updates deps
   * @param {Object} [depsMap={}]
   * @memberof module:core.ModuleManager
   */
  update(depsMap = {}) {
    for (const key in depsMap) {
      if (this.updateMap[key])
        this.updateMap[key].push(depsMap[key]);
      else
        this.updateMap[key] = [depsMap[key]];
    }
  }

  /**
   * @method add
   * @description Adds dependency to .store collection.
   * @param {String} key the key of the dependency
   * @param {Object} object
   * @param {Object} [config]
   * @memberof module:core.ModuleManager
   * @example <caption>Adding config to as 'hello'</caption>
   * manager.add('hello', {world: true});
   */
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

  /**
   * @method get
   * @description Returns dependency in store object, by key.
   * @param {String} key the key of the dependency
   * @param {Boolean} [getModule=false]
   * @memberof module:core.ModuleManager
   * @return {Object|Module}
   * @throws DependencyError if dependency is not in the store
   * @example <caption>Get the 'hello' dependency</caption>
   * manager.get('hello'); // -> {world: true}
   */
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

  /**
   * @method has
   * @description Returns whether manager has a dependency with the given key
   * @param {String} key the key of the dependency
   * @memberof module:core.ModuleManager
   * @return {Boolean} Promise that is resolved when all promises completed.
   * @example <caption>Check whether the store has the 'hello' dependency</caption>
   * manager.has('hello'); // -> true
   */
  has(key) {
    return Boolean(this.store[key]);
  }

  // ALIAS METHODS
  /**
   * @method set
   * @description An alias for .add() <br/><br/>
   * Use this method if you know that you will overwrite existing dependency.<br/>
   * Use it in your app, but not in module that you provide to other people.
   * @param {String} key the key of the dependency
   * @param {Object} value the value of the dependency
   * @memberof module:core.ModuleManager
   */
  set(key, value) {
    this.add(key, value, this.store[key][2] || {});
  }
}
