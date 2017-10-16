import {Component} from './Component';
import {CompositionError} from '../core';
import {Object3D} from 'three';

export interface CameraComponentParams {
    build?: boolean;

    position?: {
      x?: number,
      y?: number,
      z?: number
    };

    rotation?: {
      x?: number,
      y?: number,
      z?: number
    };
  }

export class CameraComponent extends Component {
  /*
   * Creates a new CameraComponent
   * TODO define instuctions interface
   */
  constructor(params?: CameraComponentParams, defaults?: CameraComponentParams, instructions?: object);

  build(): CompositionError | Object3D;

  wrap(): Promise<CameraComponent>;

  copy(source: CameraComponent): CameraComponent;

  clone(): CameraComponent;
}
