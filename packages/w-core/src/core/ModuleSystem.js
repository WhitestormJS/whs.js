import {REVISION} from 'three';
import Events from 'minivents';
import {ManagerError} from './errors';

// Check for Three.js
const warnDeps = () => {
  throw new Error('WhitestormJS Framework requ ires Three.js r92. https://threejs.org/');
};

try {
  if (!REVISION) warnDeps();
} catch (err) {
  warnDeps();
}

/**
 * @class ModuleSystem
 * @category core
 * @description  Provides API for classes that will use Modules.<br/>
 * This class includes basic event system with those supported methods:
 * <pre>.on()</pre><pre>.off()</pre><pre>.emit()</pre>
 * @extends Events
 * @memberof module:core
 */
export class ModuleSystem extends Events {
  // INTEGRATING

  /**
   * @method integrateModules
   * @instance
   * @description This method applies all modules from .modules collection.
   * @param {Object} [source] If source (should be a component) is provided, will replace .modules with source's one before executing modules.
   * @memberof module:core.ModuleSystem
   */
  integrateModules(source) {
    if (!this.modules && !source) return;
    if (source && source.modules) this.modules = source.modules.slice(0);

    if (this.modules) {
      for (let i = 0, max = this.modules.length; i < max; i++)
        this.applyModule(this.modules[i], false);
    }

    if (source) this.applyBridge({onCopy: source});
  }

  // APPLYING MODULE (...and a "bridge" for module)

  /**
   * @method applyBridge
   * @instance
   * @description Makes component-specific API to work with modules.
   * @param {Object} bridgeMap the bridge map
   * @return {Object} Returns object with modified values.
   * @memberof module:core.ModuleSystem
   */
  applyBridge(bridgeMap = {}) {
    const {modules} = this;
    if (!modules) return bridgeMap;

    for (let i = 0, max = modules.length; i < max; i++) {
      for (const key in bridgeMap) {
        if (bridgeMap[key]) {
          const module = modules[i];

          if (module && module.bridge && module.bridge[key])
            bridgeMap[key] = module.bridge[key].apply(this, [bridgeMap[key], module]);
        }
      }
    }

    return bridgeMap;
  }

  /**
   * @method applyCommand
   * @instance
   * @description .applyCommand runs a method called `name` on all modules.
   * @param {String} name the method name.
   * @param {Function} [cb=(func, moduleScope) => func.apply(this, [moduleScope])] How the function is wrapped/
   * @memberof module:core.ModuleSystem
   */
  applyCommand(name, cb = (func, moduleScope) => func.apply(this, [moduleScope])) {
    const {modules} = this;
    if (!modules) return;

    for (let i = 0, max = modules.length; i < max; i++) {
      const module = modules[i];
      if (name in module) cb(module[name], module);
    }
  }

  /**
   * @method applyModule
   * @instance
   * @description .applyModule is also used in .integrateModules() function.
   * It does exactly what its name says (applies module to component or app).
   * @param {Object} module the module to apply
   * @param {Boolean} [push=true] flag to determine whether to add it to the array
   * @return {Object} Returns module that was applied.
   * @throws {ManagerError}
   * @memberof module:core.ModuleSystem
   */
  applyModule(module, push = true) {
    if (!module) return;
    if (push && this.modules) this.modules.push(module);
    else if (push) this.modules = [module];

    if (this.manager) this.manager.active(module);

    if (module.manager && this.manager) module.manager(this.manager);
    else if (module.manager) {
      throw new ManagerError(
        'Component',
        `Module requires ModuleManager that is turned off for this component`,
        this, module
      );
    }

    if (module.integrate) module.integrate.bind(this)(module);

    return module;
  }

  /**
   * @method disposeModules
   * @instance
   * @description Disposes of all modules
   * @memberof module:core.ModuleSystem
   */
  disposeModules() {
    while (this.modules.length)
      this.disposeModule(this.modules[0]);
  }

  /**
   * @method disposeModule
   * @instance
   * @description Disposes of the given module
   * @param {Object} module the module to dispose
   * @return {Module} Returns module that was removed.
   * @memberof module:core.ModuleSystem
   */
  disposeModule(module) {
    if (!module) return;

    this.modules.splice(this.modules.indexOf(module), 1);

    if (module.dispose) module.dispose.bind(this)(module);

    return module;
  }

  // PIPED METHOD

  /**
   * @method module
   * @instance
   * @description piped version of .applyModule().
   * @param {Object} module the module to apply
   * @return {this} returns this - app/component
   * @throws {ManagerError}
   * @memberof module:core.ModuleSystem
   * @example <caption>Piped modules</caption>
   * component
   *   .module(new Module1())
   *   .module(new Module2())
   *   .module(new Module3())
   */
  module(module) {
    this.applyModule(module);
    return this;
  }
}
