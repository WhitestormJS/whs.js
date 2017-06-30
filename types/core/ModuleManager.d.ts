import {Module} from './Module';

export class ModuleManager {
  /**
   * Constructs a ModuleManager
   */
  constructor(object: Object);

  /**
   * Sets .currentModule to provided module.
   */
  active(module: Module): void;

  /**
   * Sets .currentModule to null.
   */
  reset(): void;

  /**
   * Updates all given keys in the map with their values, in store object
   */
  update(depsMap: Map<String, String>): void;

  /**
   * Returns a Boolean value. Whether manager has a dependency with the following key
   */
  has(key: String): Boolean;

  /**
   * Returns dependency by it's key in store object
   */
   get(key: String): object;

  /**
   * Adds dependency to .store collection.
   */
  add(key: String, object: object, config?: object): void;

  /**
   * An alias for .add()
   * Use this method if you know that you will overwrite existing dependency.
   * Use it in your app, but not in module that you provide to other people.
   */
  set(key: String, object: object, config?: object): void;
}
