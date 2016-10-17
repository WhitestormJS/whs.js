import * as THREE from 'three';
import {Component} from './Component';

export class Element {
  constructor(native, decorators = [], params = {}) {
    const wrapComponentClass = (() => {
      class component extends Component {
        constructor() {
          super(params, component.defaults);
        }
      };

      for (let i = 0, max = decorators.length; i < max; i++) {
        component = decorators[i](component);
      }

      return component;
    })();

    const element = new wrapComponentClass();
    element.native = native;

    return element;
  }
}
