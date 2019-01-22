import {createStore} from 'redux';
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

    this.store = createStore((state = [{}, ''], action) => {
      state[0][action.key] = action.data;
      state[1] = action.key;

      return state;
    });

    this.modules = {};
  }

  /**
   * @method active
   * @instance
   * @description Sets .currentModule to provided module.
   * @param {Object} module the module to make current
   * @memberof module:core.ModuleManager
   */
  active(module) {
    this.currentModule = module;
  }

  /**
   * @method reset
   * @instance
   * @description Set's .currentModule to null.
   * @memberof module:core.ModuleManager
   */
  reset() {
    this.currentModule = null;
  }

  /**
   * @method define
   * @instance
   * @description Define the module in manager
   * @param {String} name The module name
   * @memberof module:core.ModuleManager
   */
  define(name) {
    this.modules[name] = this.currentModule;
  }

  /**
   * @method use
   * @instance
   * @description Get the defined module from manager
   * @param name The module name
   * @memberof module:core.ModuleManager
   */
  use(name) {
    return this.modules[name];
  }

  /**
   * @method set
   * @instance
   * @description An alias for .add() <br/><br/>
   * Use this method if you know that you will overwrite existing dependency.<br/>
   * Use it in your app, but not in module that you provide to other people.
   * @param {String} key the key of the dependency
   * @param {Object} data the value of the dependency
   * @memberof module:core.ModuleManager
   */
  set(key, data) {
    this.store.dispatch({
      type: 'ADD',
      key,
      data
    });
  }

  /**
   * @method get
   * @instance
   * @description Returns dependency in store object, by key.
   * @param {String} key the key of the dependency
   * @memberof module:core.ModuleManager
   * @return {Object|Module}
   * @throws {DependencyError} if dependency is not in the store
   * @example <caption>Get the 'hello' dependency</caption>
   * manager.get('hello'); // -> {world: true}
   */
  get(key) {
    if (!this.store.getState()[0][key]) {
      throw new DependencyError(
        'ModuleManager',
        `Module requires '${key}' dependency`,
        this.currentModule
      );
    }

    return this.store.getState()[0][key];
  }

  /**
   * @method has
   * @instance
   * @description Returns whether manager has a dependency with the given key
   * @param {String} key the key of the dependency
   * @memberof module:core.ModuleManager
   * @return {Boolean} Promise that is resolved when all promises completed.
   * @example <caption>Check whether the store has the 'hello' dependency</caption>
   * manager.has('hello'); // -> true
   */
  has(key) {
    return Boolean(this.store.getState()[0][key]);
  }

  /**
   * @method update
   * @instance
   * @description Updates deps
   * @param {Object} [depsMap={}]
   * @memberof module:core.ModuleManager
   */
  update(depsMap = {}) {
    this.store.subscribe(() => {
      const [data, changedKey] = this.store.getState();
      const callback = depsMap[changedKey];

      if (callback) callback(data[changedKey]);
    });
  }

  /**
   * @method add
   * @alias module:core.ModuleManager#set
   * @memberof module:core.ModuleManager
   */
  add(...data) {
    console.warn('.add() method is deprecated. Use .set() instead');
    return this.set(...data);
  }

  /**
   * @method require
   * @instance
   * @description Require module
   * @param {String} name Defined name
   * @param {Function} moduleExecutor Function that returns applied module
   * @memberof module:core.ModuleManager
   */
  require(name, moduleExecutor) {
    if (this.use(name) === undefined) this.handler.applyModule(moduleExecutor());
  }
}
