import {CubeCamera as CubeCameraNative} from 'three';
import {CameraComponent} from '../../core/CameraComponent';

/**
 * @class CubeCamera
 * @category components/cameras
 * @description Creates 6 cameras that render to a WebGLRenderTargetCube
 * @param {Object} [params] - The parameters object.
 * @memberof module:components/cameras
 * @extends module:core.CameraComponent
 * @example <caption>Creates a CubeCamera and set it as app's camera</caption>
 * const camera = new CubeCamera({
 *   camera: {
 *     cubeResolution: 256
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
class CubeCamera extends CameraComponent {

  /**
   * Default values for parameters
   * @member {Object} module:components/cameras.CubeCamera#defaults
   * @static
   * @default <pre>
   * {
   *   camera: {
   *     near: 1,
   *     far: 1000,
   *     cubeResolution: 128
   *   }
   * }</pre>
   */
  static defaults = {
    ...CameraComponent.defaults,

    near: 1,
    far: 1000,
    cubeResolution: 128
  };

  constructor(params = {}) {
    super(params, CubeCamera.defaults);
  }

  build(params = {}) {
    return this.applyBridge({camera: new CubeCameraNative(
      params.near,
      params.far,
      params.cubeResolution
    )}).camera;
  }
}

export {
  CubeCamera
};
