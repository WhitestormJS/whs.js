import {extend, transformData} from '../utils/index';
import {ModuleSystem} from './ModuleSystem';
import {ModuleManager} from './ModuleManager';
import {ManagerError} from './errors';

/**
 * @class Component
 * @param {Object} [params] - The parameters object.
 * @param {Object} [instructions] - The instructions object.
 * @extends ModuleSystem
 * @memberof module:core
 */
class Component extends ModuleSystem {
  /**
   * Default values for parameters
   * @member {Object} module:core.Component#defaults
   * @static
   * @default {
     modules: [],
     manager: true
   }
   */
  static defaults = {
    modules: [],
    manager: true
  };

  /**
   * Static instructions
   * @member {Object} module:core.Component#instructions
   * @static
   * @default {}
   */
  static instructions = {};

  /**
   * Array of promises that should be resolved before Component is ready.
   * @member {Array} module:core.Component#_wait
   * @private
   */
  _wait = []; // Collection of promises;

  /**
   * Collection of `modules`.
   * @member {Array} module:core.Component#modules
   * @public
   */
  modules = []; // Collection of modules;

  /**
   * Collection of `child` Components.
   * @member {Array} module:core.Component#children
   * @public
   */
  children = []; // For keeping children components;

  constructor(params = {}, defaults = Component.defaults, instructions = Component.instructions) {
    super();

    // Apply polyfilled parameters to .params;
    this.params = extend(transformData(params, instructions), defaults);
    if (this.params.manager) this.manager = new ModuleManager();

    this.modules = this.params.modules;

    this.integrateModules();
  }

  /**
   * @method wait
   * @description Wait for a promise.
   * @param {Promise} [promise] - The promise that should be added to a queue.
   * @return {Promise} Promise that is resolved when all promises completed.
   * @memberof module:core.Component
   */
  wait(promise) {
    if (promise) this._wait.push(promise);
    return Promise.all(this._wait);
  }

  /**
   * @method defer
   * @description Execute `func` (Callback) when Component is ready.
   * @param {Function} func - Callback.
   * @memberof module:core.Component
   */
  defer(func) {
    if (this.isDeffered) this.wait().then(() => func(this));
    else func(this);
  }

  // PARAMETERS

  /**
   * @method updateParams
   * @description Updates parameters of the Component.
   * @return {Object} Params of this Component
   * @memberof module:core.Component
   */
  updateParams(params = {}) {
    this.params = extend(params, this.params);
    return this.params;
  }

  // COPYING & CLONING

  /**
   * @method clone
   * @description Clone this component
   * @return {object} a cloned component with all its source component' params copied.
   * @memberof module:core.Component
   */
  clone() {
    return new this.constructor(this.params).copy(this);
  }

  /**
   * @method copy
   * @description Copy source native and integrate `modules` to it.
   * @param {Component} source - Source component that is used for `copy()` action.
   * @param {Function} [customize] - Callback executed before modules integration process.
   * @return {this} Component
   * @memberof module:core.Component
   */
  copy(source, customize) {
    this.params = {...source.params};

    if (source.native) this.native = source.native.clone(source.params);
    if (customize) customize();
    this.integrateModules(source);

    return this;
  }

  /**
   * @method add
   * @description Add a child `Component`.
   * @param {Component} object - Component that should be added as a `child`.
   * @return {Promise} Resolved when action is done.
   * @memberof module:core.Component
   */
  add(object) {
    object.parent = this;

    return new Promise((resolve, reject) => {
      this.defer(() => {
        const {native} = object;
        if (!native) reject();

        const addPromise = this.applyBridge({onAdd: object}).onAdd;

        const resolver = () => {
          this.native.add(native);
          this.children.push(object);

          resolve(object);
        };

        if (addPromise instanceof Promise) addPromise.then(resolver);
        else resolver();
      });
    });
  }

  /**
   * @method remove
   * @description Remove a child `Component`.
   * @param {Component} object - Component that should be a **child** of this Component.
   * @memberof module:core.Component
   */
  remove(object) {
    object.parent = null;
    this.native.remove(object.native);
  }

  /**
   * @method addTo
   * @description Adds `this` Component to specified `App`/`Component`.
   * @param {Component} object - Component that will be a parent of `this`.
   * @memberof module:core.Component
   */
  addTo(object) {
    return object.add(this);
  }

  /**
   * Returns whether the object is `async` (`wait` promises are more than `0`).
   * @member {Boolean} module:core.Component#isDeffered
   */
  get isDeffered() {
    return this._wait.length > 0;
  }

  /**
   * Returns the `ModuleManager` used for this component.
   * @member {ModuleManager} module:core.Component#manager
   * @throws {ManagerError}
   */
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

  /**
   * Returns the `native` object used for this component.
   * @member {Object} module:core.Component#native
   */
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
