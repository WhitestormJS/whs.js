import {Component} from './Component';
import {CompositionError} from './errors';

export class LightComponent extends Component {
  /**
   * TODO define parameters
   */
  constructor(params: object, defaults?: object, instructions?: object);

  /**
   * TODO throws a CompositionError
   */
  build(): CompositionError;

  /**
   * TODO
   * Returns a Promise
   */
  wrap(): any;

  /**
   * TODO
   */
  wrapShadow(): void;

  /**
   * TODO
   */
  copy(source: Component): LightComponent;

  /**
   * TODO
   */
  clone(): LightComponent;
}
