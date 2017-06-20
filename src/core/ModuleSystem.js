import {REVISION} from 'three';
import Events from 'minivents';
import {ManagerError} from './errors';

// Check for Three.js
const warnDeps = () => {
  throw new Error('WhitestormJS Framework requires Three.js r84. https://threejs.org/');
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
   * @description This method applies all modules from .modules collection.
   * @param {Object} [source] If source (should be a component) is provided, will replace .modules with source's one before executing modules.
   * @memberof module:core.ModuleSystem
   */
  integrateModules(source) {
    if (source) this.modules = source.modules.slice(0);

    for (let i = 0, max = this.modules.length; i < max; i++)
      this.applyModule(this.modules[i], false);

    if (source) this.applyBridge({onCopy: source});
  }

  // APPLYING MODULE (...and a "bridge" for module)

  /**
   * @method applyBridge
   * @description Makes component-specific API to work with modules.
   * @param {Object} bridgeMap
   * @return {Object} Returns object with modified values.
   * @memberof module:core.ModuleSystem
   */
  applyBridge(bridgeMap = {}) {
    const modules = this.modules;

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
   * @method applyModule
   * @description .applyModule is also used in .integrateModules() function.
   * It does exactly what its name says (applies module to component or app).
   * @param {Object} module the module to apply
   * @param {Boolean} [push=true]
   * @return {Object} Returns module that was applied.
   * @throws {ManagerError}
   * @memberof module:core.ModuleSystem
   */
  applyModule(module, push = true) {
    if (!module) return;
    if (push) this.modules.push(module);

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

  applyModuleOnce(ModuleConstructor, getModule, push = true) {
    const isAlreadyIncluded = this.modules.some(m => m instanceof ModuleConstructor);
    if (!isAlreadyIncluded) return this.applyModule(getModule(), push);
  }

  disposeModules() {
    while (this.modules.length)
      this.disposeModule(this.modules[0]);
  }

  disposeModule(module) {
    if (!module) return;

    this.modules.splice(this.modules.indexOf(module), 1);

    if (module.dispose) module.dispose.bind(this)(module);

    return module;
  }

  // PIPED METHOD

  /**
   * @method module
   * @description piped version of .applyModule().
   * @param {Object} module the module to apply
   * @return {Object} returns this - app/component
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
