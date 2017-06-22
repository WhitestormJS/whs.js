import {PerspectiveCamera as PerspectiveCameraNative} from 'three';
import {CameraComponent} from '../../core/CameraComponent';
import {system} from '../../polyfill';

/**
 * @class PerspectiveCamera
 * @description Camera with perspective projection.
 * @category components/cameras
 * @param {Object} [params] - The parameters object.
 * @memberof module:components/cameras
 * @extends CameraComponent
 * @example <caption>Create an PerspectiveCamera and set it as app's camera</caption>
 * const camera = new PerspectiveCamera({
 *   camera: {
 *     fov: 75,
 *     aspect: window.innerWidth / window.innerHeight
 *   },
 *
 *   position: {
 *     x: 0,
 *     y: 100,
 *     z: 0
 *   }
 * });
 *
 * app.camera = camera;
 */
class PerspectiveCamera extends CameraComponent {
  /**
   * Default values for parameters
   * @member {Object} module:components/cameras.PerspectiveCamera#defaults
   * @static
   * @default <pre>
   * {
   *   camera: {
   *     near: 1,
   *     far: 1000,
   *     fov: 45,
   *     aspect: system.window.innerWidth / system.window.innerHeight
   *   }
   * }</pre>
   */
  static defaults = {
    ...CameraComponent.defaults,

    camera: {
      near: 1,
      far: 1000,
      fov: 45,
      aspect: system.window.innerWidth / system.window.innerHeight
    }
  };

  constructor(params = {}) {
    super(params, PerspectiveCamera.defaults);
  }

  build(params = {}) {
    return this.applyBridge({camera: new PerspectiveCameraNative(
      params.camera.fov,
      params.camera.aspect,
      params.camera.near,
      params.camera.far
    )}).camera;
  }
}

export {
  PerspectiveCamera
};
