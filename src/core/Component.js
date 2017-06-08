/** @module core/Component */
import {extend, transformData} from '../utils/index';
import {ModuleSystem} from './ModuleSystem';
import {ModuleManager} from './ModuleManager';
import {ManagerError} from './errors';

/** Class representing a Comonent */
class Component extends ModuleSystem {
  static defaults = {
    modules: [],
    manager: true
  };

  static instructions = {};

  _wait = []; // Collection of promises;
  modules = []; // Collection of modules;
  children = []; // For keeping children components;

  /**
   * Create a Component.
   * @constructor
   * @param {Object} [params] - The parameters object.
   * @param {Object} [instructions] - The instructions object.
   */
  constructor(params = {}, defaults = Component.defaults, instructions = Component.instructions) {
    super();

    // Apply polyfilled parameters to .params;
    this.params = extend(transformData(params, instructions), defaults);
    if (this.params.manager) this.manager = new ModuleManager();

    this.modules = this.params.modules;

    this.integrateModules();
  }

  // PROMISES (Asynchronous code)

  // FIXME: possible use of Promise.all(this._wait) only in .defer();
  wait(promise) {
    if (promise) this._wait.push(promise);
    return Promise.all(this._wait);
  }

  defer(func) {
    if (this.isDeffered) this.wait().then(() => func(this));
    else func(this);
  }

  // PARAMETERS

  updateParams(params = {}) {
    this.params = extend(params, this.params);
    return this.params;
  }

  // COPYING & CLONING

  /**
   * Clone this component
   * @return {object} a cloned component with all its source component' params copied.
   */
  clone() {
    return new this.constructor(this.params).copy(this);
  }

  copy(source, customize) {
    this.params = {...source.params};

    if (source.native) this.native = source.native.clone(source.params);
    if (customize) customize();
    this.integrateModules(source);

    return this;
  }

  // ADD

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

  remove(object) {
    object.parent = null;
    this.native.remove(object.native);
  }

  addTo(object) {
    return object.add(this);
  }

  // GETTERS & SETTERS

  get isDeffered() {
    return this._wait.length > 0;
  }

  // .manager

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

  // .native

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
  /** Component class */
  Component
};
