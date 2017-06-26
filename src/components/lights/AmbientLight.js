import {AmbientLight as AmbientLightNative} from 'three';
import {LightComponent} from '../../core/LightComponent';

/**
 * @class AmbientLight
 * @category components/lights
 * @description AmbientLight is a simple class, it extends Light and inherits all its methods.
 * AmbientLight creates basic light around all scene, so it doesn't need properties like pos or target.
 * It supports only color and intensity as parameters, which defines the color of the surrounded light and intensity of light.
 * @param {Object} [params={light: {color: 0xffffff, intensity: 1}}] - The params.
 * @extends module:core.LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating an AmbientLight </caption>
 * new AmbientLight({
 *   color: 0xffffff,
 *   intensity: 0.2
 * }).addTo(world);
 */
class AmbientLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,

    color: 0xffffff,
    intensity: 1
  };

  constructor(params = {}) {
    super(params, AmbientLight.defaults);
  }

  build(params = {}) {
    return this.applyBridge({light: new AmbientLightNative(
      params.color,
      params.intensity
    )}).light;
  }
}

export {
  AmbientLight
};
