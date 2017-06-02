import {Component} from './Component';
import {Module} from './Module';

export class ModuleConstructor {
  // TODO
}

export class ModuleSystem {
  /**
   * This method applies all modules from .modules collection.
   * If source is provided - will replace .modules with source's one before executing modules
   */
  integrateModules(source?: Component): void;

  /**
   * Makes component-specific API to work with modules.
   * It will pass components in the map to the first module having an applicable bridge
   */
  applyBridge(bridgeMap? : Map<String, Component>): Map<String, Component>;

  /**
   * applyModule is also used in .integrateModules() function.
   * It does exactly what its name says (applies module to component or app).
   */
  applyModule(module: Module, push?: Boolean): Module;

  applyModuleOnce(moduleConstructor: ModuleConstructor, getModule: Function, push?: Boolean): void;

  disposeModules(): void;

  disposeModule(module: Module): Module;

  /*
   * .module() is a piped version of .applyModule().
   * It returns this - app/component.
   */
  module(module: Module): any;
}
