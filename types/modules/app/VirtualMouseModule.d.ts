import Events from 'minivents';
import {Component} from '../../core';

/**
 * ResizeModule native param
 */
export interface NativeParam {
  /**
   * the native object
   */
  native: any;
} 

export class VirtualMouseModule extends Events {

  /**
   * @constructor Creates a virtual mouse module.
   * @param globalMovement sets whether mouse events outside the context should track. Default is false.
   */
  constructor(globalMovement?: boolean);

  /**
   * Update
   * @param e mouse event
   * @param customX x position
   * @param customY y position
   */
  update(e: MouseEvent, customX: number, customY: number): void;

  /**
   * Tracks component
   * @param component component to track
   * @param nested Whether it will track all descendant of the component. 
   * Default is true
   */
  track(component: Component, nested?: boolean): void;

  /**
   * 
   * @param native 
   * @param nested If true, it also checks all descendants.
   * Otherwise it only checks intersection with the object. 
   * Default is true.
   */
  intersection(native: NativeParam, nested?: boolean): Array<any>;

  /**
   * TODO doc
   * @param plane 
   */
  project(plane: any): any;

  /**
   * Returns true if there is an intesection with the given component. 
   * @param component the component to check if it's hovering over.
   * @param nested Default is true
   */
  hovers(component: Component, nested?: boolean): boolean;

  // TODO add types for all those get methods

}
