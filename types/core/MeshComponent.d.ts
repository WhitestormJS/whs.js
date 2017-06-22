import {Component} from './Component';
import {CompositionError} from './errors';

export class MeshComponent extends Component {
  /**
   * TODO
   */
  constructor(params: object, defaults?: object, instructions?: object);

  /**
   * TODO explain why error
   */
  build(): CompositionError;

  /**
   * TODO define the returned Promise
   */
  wrap(): any;

  // COPYING & CLONING
  /**
   * TODO
   * @return The MeshComponent with copied source properties.
   */
  copy(source: object): MeshComponent;

  /**
   * TODO fix this, inheritance is obscure with this overload
   * Suggest deprecating this and call clone something like cloneProperties
   */
  clone(): MeshComponent;
}
