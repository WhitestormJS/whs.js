import {Component} from './Component';
import {CompositionError} from './errors';

export interface LightComponentParams {
  /** Sets whether the component should build automatically. Default is true. */
  build?: boolean,
  
  /** The shadows settings */
  shadow?: {
    /** Sets whether the light should cast shadows. Default is true. */
    cast?: boolean,
    
     /** The bias of the shadow. Default is 0. */
    bias?: number,

    /** The radius of the shadow. Default is 1. */
    radius?: number,

    /** The shadow map size */
    mapSize?: {
      /** Width of the map. Default is 1024. */
      width?: number,

      /** Height of the map. Default is 1024. */
      height?: number
    },
  },

  /** Camera settings */
  camera?: {
    
    /** 
     * TODO fixme, should be number in doc too
     * Camera frustum near plane.
     */
    near?: number,

    /** Camera frustum far plane. Default is 400. */
    far?: number,

    /** 
     * Camera frustum vertical field of view.
     * From bottom to top of view, in degrees. Default is 90.
     */
    fov?: number,
   
    /**
     * Default is 200.
     */
    top?: number,

    /**
     * Default is -200.
     */
    bottom?: number,

    /**
     * Default is -200.
     */
    left?: number,

    /**
     * Default is 200.
     */
    right?: number
  },

  /** Position of the light. */
  position?: {
    /** Default is 0. */
    x?: number,
    /** Default is 0. */
    y?: number,
    /** Default is 0. */
    z?: number
  }
 
  /** Rotation of the light. */
  rotation?: {
    /** Default is 0. */
    x?: number,
    /** Default is 0. */
    y?: number,
    /** Default is 0. */
    z?: number
  }
} 

export class LightComponent extends Component {
  /**
   * @constructs a light component.
   * @param params parameters.
   * @param defaults default values.
   * @param instructions instructions to translate objects to arrays
   */
  constructor(params?: LightComponentParams, defaults?: object, instructions?: object);

  /**
   * @throws a CompositionError.
   */
  build(): CompositionError | LightComponent;

  /**
   * @returns a Promise
   */
  wrap(): Promise<LightComponent>;

  /**
   * Wraps shadow properties.
   */
  wrapShadow(): void;

  /**
   * Copies source transforms & execute Component.copy().
   * @param source the source component.
   * @returns the copied light component.
   */
  copy(source: Component): LightComponent;

  /**
   * Makes a clone of this LightComponent using .copy().
   * @returns the cloned light component.
   */
  clone(): LightComponent;
}
