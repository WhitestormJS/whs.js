import {Component} from './Component';

export interface defaults {
    build: true;

    position: {
      x: 0,
      y: 0,
      z: 0
    };

    rotation: {
      x: 0,
      y: 0,
      z: 0
    };
  }

export class CameraComponent extends Component {
  /*
   * Creates a new CameraComponent
   * TODO define params & instuctions interface
   */
  constructor(params?: object, defaults?: defaults, instructions?: object);

  /*
   * TODO
   */
  build(): Error;

  /*
   * TODO
   */
  wrap(): any;

  /*
   * TODO
   */
  copy(source: Component): CameraComponent;

  /*
   * TODO
   */
  clone(): CameraComponent;
}
