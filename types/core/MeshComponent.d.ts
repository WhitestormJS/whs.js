import {Component} from './Component';
import {CompositionError} from './errors';
import {Material} from 'three';

interface MeshParameters {
  material?: Material,

  shadow?: {
    receive?: boolean,
    cast?: boolean
  },

  position?: {
    x?: number,
    y?: number,
    z?: number
  }
}

export class MeshComponent extends Component {
  /**
   * TODO
   */
  constructor(params?: MeshParameters, defaults?: object, instructions?: object);

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
