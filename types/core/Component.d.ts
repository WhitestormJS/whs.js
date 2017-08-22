import {ModuleSystem} from './ModuleSystem';
import {App} from './App';

export class Component extends ModuleSystem {
  /**
   * Creates a component
   * @param params
   * @param defaults
   * @param instructions
   */
  constructor(params?: object, defaults?: object, instructions?: object);

  /**
   * Adds this object to a Component (App ,etc)
   * Notes: As we work in 3D space - we have an App and objects it contains.
   * The App is usually the top the parent, objects are its children.
   */
  addTo(parent: App | Component): Promise<Component>;

  /**
   * Adds a child Component.
   */
  add(object: Component): Promise<Component>;

  /**
   * Removes a child Component.
   * @param object The child component to remove.
   */
  remove(object: Component): void;

  /**
   * Updates parameters of the Component.
   * @param object the parameters
   */
  updateParams(params: object): object;

  // TODO
  wait(promise: object): any;

  // TODO
  defer(func: Function): any;

  /* 
   * .clone() invokes .copy() and returns a new Component
   */
  clone(): Component;

  /* 
   * This method is used to copy .native and .params from other Component.
   * @param source
   * @param customize
   */
  copy(source: Component, customize?: Function): Component;
}
