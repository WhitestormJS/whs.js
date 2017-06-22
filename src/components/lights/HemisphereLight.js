import {HemisphereLight as HemisphereLightNative, HemisphereLightHelper} from 'three';
import {LightComponent} from '../../core/LightComponent';

/**
 * @class HemisphereLight
 * @category components/lights
 * @description HemisphereLight is a light source positioned directly above the scene.<br/>
 * It also doesn't need position and target properties.
 * @param {Object} [params={light: {skyColor: 0xffffff, groundColor: 0xffffff, intensity: 1}}] - The params.
 * @extends LightComponent
 * @memberof module:components/lights
 * @example <caption>Creating a HemisphereLight</caption>
 * new HemisphereLight({
 *   light: {
 *     skyColor: 0xff0000,
 *     groundColor: 0x0000ff,
 *     intensity: 0.2
 *   }
 * }).addTo(app);
 */
class HemisphereLight extends LightComponent {
  static defaults = {
    ...LightComponent.defaults,
    light: {
      skyColor: 0xffffff,
      groundColor: 0xffffff,

      intensity: 1
    }
  }

  constructor(params = {}) {
    super(params, HemisphereLight.defaults);
  }

  build(params = {}) {
    return this.applyBridge({light: new HemisphereLightNative(
      params.light.skyColor,
      params.light.groundColor,
      params.light.intensity
    )}).light;
  }
}

export {
  HemisphereLight
};
