import {Component} from './Component';
import {CompositionError} from './errors';
import {
  Material, 
  Mesh,
  Object3D
} from 'three';

export interface MeshComponentParams {
  /**
   * Sets whether the mesh should build right away after being constructed
   * Default is true.
   */
  build?: boolean,

  /**
   * Material of this Mesh.
   */
  material?: Material,

  /** Shadows properties */
  shadow?: {
    /** Sets whether the mesh receives shadows. Default is true. */
    receive?: boolean,
    /** Sets whether the mesh casts shadows. Default is true. */
    cast?: boolean
  },

  /** Position of the mesh. */
  position?: {
    /** Default is 0. */
    x?: number,
    /** Default is 0. */
    y?: number,
    /** Default is 0. */
    z?: number
  },

  /** Rotation of the mesh. */
  rotation?: {
    /** Default is 0. */
    x?: number,
    /** Default is 0. */
    y?: number,
    /** Default is 0. */
    z?: number
  },

  /** Scale of the mesh. */
  scale?: {
    /** Default is 1. */
    x?: number,
    /** Default is 1. */
    y?: number,
    /** Default is 1. */
    z?: number
  }
}

export class MeshComponent extends Component {
  /**
   * @constructs a mesh component.
   */
  constructor(params?: MeshComponentParams, defaults?: object, instructions?: object);

  /**
   * @throws a CompositionError.
   */
  build(): CompositionError | Mesh | Promise<Mesh> | Object3D;

  /**
   * @returns a Promised mesh component
   */
  wrap(): Promise<MeshComponent>;

  /**
   *
   * @return The MeshComponent with copied source properties.
   */
  copy(source: object): MeshComponent;

  /**
   * TODO fix this, inheritance is obscure with this overload
   * Suggest deprecating this and call clone something like cloneProperties
   */
  clone(): MeshComponent;
}
