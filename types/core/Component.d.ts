import {ModuleSystem} from './ModuleSystem';
import {App} from './App';

export class AddPromise {
  // TODO
}

export class Component extends ModuleSystem {
  /**
   *
   */
  constructor(params?: object, defaults?: object, instructions?: object);

  /**
   * Adds this object to the App.
   * Notes: As we work in 3D space - we have an App and objects it contains.
   * The App is the parent, objects are its children.
   */
  addTo(parent: App): AddPromise;

  /**
   * TODO
   */
  add(object: object): AddPromise;

  /**
   * TODO
   */
  remove(object: object): void;

  // TODO
  updateParams(object: object): object;

  // TODO
  wait(promise: object): any;

  // TODO
  defer(func: Function): any;

  /* TODO
   * .clone() invokes .copy() and returns a new Component
   */
  clone(): Component;

  /* TODO
   * This method is used to copy .native and .params from other WHS.Component
   */
  copy(source: any, customize?: Function): Component;
}
