import {Component} from './Component';

export class Element {
  constructor(native, decorators = [], params = {}) {
    const Constructor = (() => {
      let result = class component extends Component {
        constructor() {
          super(params, component.defaults);
        }
      };

      for (let i = 0, max = decorators.length; i < max; i++)
        result = decorators[i](result);

      return result;
    })();

    const element = new Constructor();
    element.native = native;

    return element;
  }
}
